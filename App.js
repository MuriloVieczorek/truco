import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const APOSTAS = [
  { label: '+1', pts: 1 },
  { label: 'Truco', pts: 3 },
  { label: 'Seis', pts: 6 },
  { label: 'Nove', pts: 9 },
  { label: 'Doze', pts: 12 },
];

function PainelTime({ nome, pontos, cor, onPontos }) {
  return (
    <View style={styles.team}>
      <Text style={styles.teamName}>{nome}</Text>
      <Text style={styles.score}>{pontos}</Text>
      {APOSTAS.map(a => (
        <TouchableOpacity key={a.label} style={[styles.apostaBtn, { backgroundColor: cor }]}
          onPress={() => onPontos(a.pts)}>
          <Text style={styles.apostaText}>{a.label} (+{a.pts})</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}