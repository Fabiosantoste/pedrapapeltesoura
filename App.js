import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [appChoice, setAppChoice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = [
    { name: 'Pedra', image: require('./assets/pedra.png') },
    { name: 'Papel', image: require('./assets/papel.png') },
    { name: 'Tesoura', image: require('./assets/tesoura.png') },
  ];

  const playGame = (userSelection) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const appSelection = choices[randomIndex].name;
    setUserChoice(userSelection);
    setAppChoice(appSelection);
    setTimeout(() => determineWinner(userSelection, appSelection), 500); // Adiciona um delay para gerar suspense
  };

  const determineWinner = (user, app) => {
    if (user === app) {
      setResult('Empatamos! Parece que pensamos igual 😊');
    } else if (
      (user === 'Pedra' && app === 'Tesoura') ||
      (user === 'Tesoura' && app === 'Papel') ||
      (user === 'Papel' && app === 'Pedra')
    ) {
      setResult('Você ganhou! Que jogada incrível! 🎉');
    } else {
      setResult('Eu ganhei! Não foi dessa vez... 😎');
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setAppChoice(null);
    setResult(null);
    Alert.alert('Novo Jogo', 'Vamos de novo! Faça sua escolha.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedra, Papel e Tesoura</Text>

      <View style={styles.choicesContainer}>
        {choices.map((choice) => (
          <TouchableOpacity key={choice.name} onPress={() => playGame(choice.name)}>
            <Image source={choice.image} style={styles.choiceImage} />
          </TouchableOpacity>
        ))}
      </View>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Você escolheu: <Text style={styles.highlight}>{userChoice}</Text>
          </Text>
          <Text style={styles.resultText}>
            Eu escolhi: <Text style={styles.highlight}>{appChoice}</Text>
          </Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      <Button title="Jogar Novamente" onPress={resetGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b',
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  choiceImage: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  resultContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#004d40',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#00796b',
  },
});
