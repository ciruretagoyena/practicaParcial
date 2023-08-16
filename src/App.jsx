import React, { useState } from "react";
import "./styles.css";

function App() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [tableData, setTableData] = useState([
    { course: "Banco de Dados", students: 0, average: 0 },
    { course: "Desenvolvimento Frontend", students: 0, average: 0 },
    { course: "Desenvolvimento Backend", students: 0, average: 0 },
  ]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedCourse || isNaN(grade) || grade < 0 || grade > 10) {
      alert("Por favor, ingrese datos válidos.");
      return;
    }

    const updatedTableData = tableData.map((data) => {
      if (data.course === selectedCourse) {
        const newStudents = data.students + 1;
        const newTotal = data.average * data.students + parseFloat(grade);
        const newAverage = newTotal / newStudents;
        return { ...data, students: newStudents, average: newAverage };
      }
      return data;
    });

    setTableData(updatedTableData);
    setSelectedCourse("");
    setGrade("");
  }

  return (
    <div className="container">
      <h1>Média de Alunos por Disciplina</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="container_input">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="" disabled>
              Selecione uma disciplina
            </option>
            <option value="Banco de Dados">Banco de Dados</option>
            <option value="Desenvolvimento Frontend">Desenvolvimento Frontend</option>
            <option value="Desenvolvimento Backend">Desenvolvimento Backend</option>
          </select>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        <input type="submit" value="Salvar" />
      </form>

      <div className="container">
        <table className="line_title">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Quantidade de Alunos</th>
              <th>Média das notas dos alunos</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data.course}>
                <td>{data.course}</td>
                <td>{data.students}</td>
                <td>{data.average.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
