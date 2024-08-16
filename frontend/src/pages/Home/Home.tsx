import React from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { increment, decrement } from '@/redux/slices/exampleSlice'

export interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const count = useAppSelector((state) => state.example.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>MagicLog Home</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default Home