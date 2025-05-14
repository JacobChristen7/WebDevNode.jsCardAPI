const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware'); // Import the authentication middleware

// Path to the cards JSON file
const cardsFilePath = path.join(__dirname, '../cards.json');

// Helper function to load cards
const loadCards = () => JSON.parse(fs.readFileSync(cardsFilePath, 'utf8')).cards;

// Helper function to save cards
const saveCards = (cards) => fs.writeFileSync(cardsFilePath, JSON.stringify({ cards }, null, 2));

// Retrieve all cards with optional filtering
router.get('/', (req, res) => {
  const cards = loadCards();
  const filters = req.query;

  // Apply filters if provided
  const filteredCards = Object.keys(filters).length
    ? cards.filter(card =>
        Object.entries(filters).every(([key, value]) => card[key] === value)
      )
    : cards;

  res.json(filteredCards);
});

// Create a new card
router.post('/create', authenticateToken, (req, res) => {
  const cards = loadCards();
  const newCard = req.body;

  // Ensure cardId is unique
  if (cards.some(card => card.id === newCard.id)) {
    return res.status(400).json({ errorMessage: 'Card ID must be unique' });
  }

  cards.push(newCard);
  saveCards(cards);

  res.json({ successMessage: 'Card created successfully', card: newCard });
});

// Update an existing card
router.put('/:id', authenticateToken, (req, res) => {
  const cards = loadCards();
  const cardId = parseInt(req.params.id, 10);
  const updatedCard = req.body;

  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ errorMessage: 'Card not found' });
  }

  // Ensure updated cardId is unique (if changed)
  if (updatedCard.id && updatedCard.id !== cardId && cards.some(card => card.id === updatedCard.id)) {
    return res.status(400).json({ errorMessage: 'Card ID must be unique' });
  }

  cards[cardIndex] = { ...cards[cardIndex], ...updatedCard };
  saveCards(cards);

  res.json({ successMessage: 'Card updated successfully', card: cards[cardIndex] });
});

// Delete an existing card
router.delete('/:id', authenticateToken, (req, res) => {
  const cards = loadCards();
  const cardId = parseInt(req.params.id, 10);

  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ errorMessage: 'Card not found' });
  }

  const deletedCard = cards.splice(cardIndex, 1);
  saveCards(cards);

  res.json({ successMessage: 'Card deleted successfully', card: deletedCard[0] });
});

module.exports = router;