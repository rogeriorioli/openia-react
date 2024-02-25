import { useState } from "react";
import {openai} from "./config/openai";

function App() {

  const [setence , setSetence] = useState<string>('sua frase motivacional irá aparecer aqui !')

  const handleSetence = async () => {
      try {
          const newSetence = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt : `gere uma frase motivacional com o tema sucesso`,
            max_tokens: 100,
            temperature: 0.3,
            n : 1
          })
          const setenceGenearate = newSetence.choices.map((setence) : string => setence.text.trim())
          setSetence(setenceGenearate.toString())
        
      } catch (error) {
        setSetence("Rate limit reached 3 times per min ,  Please try again in 20s ")

      }
    }
  return (
    <main className="container mx-auto flex flex-col justify-center items-center h-screen ">
      <div className="rounded-lg lg:w-96 border-2 border-sky-500 p-8 mb-8">
        {setence}
      </div>
      <button className="w-16 h-16 rounded-full bg-sky-400 text-white  font-semibold uppercase flex justify-center items-center cursor-pointer"
        onClick={handleSetence}
      >
        gerar
      </button>
    </main>
  );
}

export default App;
