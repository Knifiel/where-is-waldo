import { firestore } from './firebaseConfig'
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  addDoc,
} from '@firebase/firestore/lite'

export const getHighscores = async () => {
  const q = query(
    collection(firestore, 'highscores'),
    orderBy('time', 'asc'),
    limit(30)
  )
  try {
    const doc_refs = await getDocs(q)
    const res: any = []
    doc_refs.forEach((score) => {
      res.push({
        id: score.id,
        ...score.data(),
      })
    })
    return res
  } catch (e) {
    console.log(e)
  }
}

export const getPokemon = async (pokemonName: String) => {
  const q = query(
    collection(firestore, 'pokemon'),
    where('name', '==', pokemonName)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot
}

export const addHighscore = async (data: { name: string; time: number }) => {
  return await addDoc(collection(firestore, 'highscores'), data)
}
