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

export default function App() {
  const [nos, setNos] = useState(0);
  const [eles, setEles] = useState(0);
  const [vNos, setVNos] = useState(0);
  const [vEles, setVEles] = useState(0);

  const addPontos = (setter, atual, pts, setV) => {
    const novo = Math.min(12, atual + pts);
    setter(novo);
    if (novo >= 12) {
      setV(v => v + 1);
      setter(0);
    }
  };

  const reiniciarPartida = () => {
    setNos(0);
    setEles(0);
  };

  const novoJogo = () => {
    setNos(0); setEles(0);
    setVNos(0); setVEles(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Marcador de Truco</Text>
      <View style={styles.vitorias}>
        <Text style={styles.vitTxt}>Vitórias — Nós: {vNos}  |  Eles: {vEles}</Text>
      </View>
      <View style={styles.teams}>
        <PainelTime nome="Nós" pontos={nos} cor="#3498db"
          onPontos={pts => addPontos(setNos, nos, pts, setVNos)} />
        <View style={styles.divider} />
        <PainelTime nome="Eles" pontos={eles} cor="#e74c3c"
          onPontos={pts => addPontos(setEles, eles, pts, setVEles)} />
      </View>
      <View style={styles.controles}>
        <TouchableOpacity style={[styles.ctrlBtn, { backgroundColor: '#f39c12' }]}
          onPress={reiniciarPartida}>
          <Text style={styles.ctrlText}>Reiniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, { backgroundColor: '#7f8c8d' }]}
          onPress={novoJogo}>
          <Text style={styles.ctrlText}>Novo Jogo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  vitorias: { marginBottom: 20 },
  vitTxt: { fontSize: 16, color: '#555' },
  teams: { flexDirection: 'row', gap: 16 },
  team: { alignItems: 'center', width: 140 },
  teamName: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  score: { fontSize: 56, fontWeight: 'bold', marginBottom: 12 },
  divider: { width: 1, alignSelf: 'stretch', backgroundColor: '#ddd', marginHorizontal: 8 },
  apostaBtn: { padding: 10, borderRadius: 8, marginVertical: 4, width: 130, alignItems: 'center' },
  apostaText: { color: '#fff', fontWeight: 'bold' },
  controles: { flexDirection: 'row', gap: 16, marginTop: 24 },
  ctrlBtn: { padding: 12, borderRadius: 8, minWidth: 120, alignItems: 'center' },
  ctrlText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});