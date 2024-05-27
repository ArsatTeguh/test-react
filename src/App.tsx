import { useState } from "react";
import "./App.css";

function App() {
  const [angka, setAngka] = useState<number>(0);
  const [result, setResult] = useState<Array<number>>([]);

  const generateGanjil = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/v1/api/generate/ganjil",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ angka }),
        }
      );
      if (response.status !== 200) {
        throw new Error("error");
      }
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.detail);
      } else {
        setResult(data?.result);
      }
    } catch (error: unknown) {
      alert(error);
    }
  };

  const generatePrisma = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/v1/api/generate/prisma",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ angka }),
        }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.detail);
      } else {
        setResult(data?.result);
      }
    } catch (error: unknown) {
      alert(error);
    }
  };

  const onAngka = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAngka(parseInt(event.target.value));
  };

  return (
    <div className='display'>
      <div className=''>
        <input
          className='input'
          type='number'
          value={angka}
          onChange={(event) => onAngka(event)}
        />
      </div>
      <div style={{ display: "flex", gap: "2rem" }} className=''>
        <button type='button' onClick={generateGanjil} className='btn'>
          Generate Bilangan Ganjil
        </button>
        <button type='button' onClick={generatePrisma} className='btn'>
          Generate Bilangan Prisma
        </button>
      </div>
      <p>Result:</p>
      <div className='' style={{ display: "flex", gap: "8px" }}>
        {result.map((value: number, index: number) => (
          <p key={index}>{value} </p>
        ))}
      </div>
    </div>
  );
}

export default App;
