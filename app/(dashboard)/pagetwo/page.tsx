"use client";
import { useState } from 'react';

export default function Home() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the definition and phonetics when the user submits the word
  const fetchDefinition = async (e) => {
    e.preventDefault();
    setError(null);
    setDefinition(null);

    if (!word) {
      setError('Please enter a word.');
      return;
    }

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      const data = await response.json();
      setDefinition(data[0]);
    } catch (err) {
      setError('Could not find the word.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Dictionary App</h1>
      <form onSubmit={fetchDefinition}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>
          Search
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {definition && (
        <div style={{ marginTop: '20px' }}>
          <h2>Word: {definition.word}</h2>
          <h3>Phonetic: {definition.phonetic}</h3>

          {definition.phonetics && definition.phonetics[0] && definition.phonetics[0].audio && (
            <div>
              <audio controls>
                <source src={definition.phonetics[0].audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <h3>Definitions:</h3>
          <ul>
            {definition.meanings[0].definitions.map((def, index) => (
              <li key={index}>{def.definition}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
