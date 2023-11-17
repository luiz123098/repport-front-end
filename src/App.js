import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ nome: '', idade: '', sexo: 'masculino' });

  // Script para gerar o pdf
  const handleGeneratePDF = async () => {
    const pdfEndpointURL = 'http://localhost:8080/formulario/pdf';

    try {
      const response = await fetch(pdfEndpointURL);
      const blob = await response.blob();
      
      // Cria um URL temporário para o blob
      const url = window.URL.createObjectURL(new Blob([blob]));
      
      // Cria um link temporário para o blob
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'formulario.pdf');
      
      // Adiciona o link ao documento e simula um clique
      document.body.appendChild(link);
      link.click();
      
      // Remove o link do documento
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      alert('Erro ao gerar o PDF. Verifique o console para detalhes.');
    }
  };

  // Script para enviar os dados para o banco
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const endpointURL = 'http://localhost:8080/formulario/registro';

    try {
      const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Dados enviados com sucesso:', data);
        
        alert('Dados enviados com sucesso!');
      } else {
        const errorData = await response.json();
        console.error('Erro ao enviar dados:', errorData);
        alert('Erro ao enviar dados. Verifique o console para detalhes.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados. Verifique o console para detalhes.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cadastro</h1>
        <form onSubmit={handleFormSubmit} className="cadastroForm">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            value={formData.nome}
            onChange={handleInputChange}
          />
          <br></br>

          <label htmlFor="idade">Idade:</label>
          <input
            type="number"
            id="idade"
            name="idade"
            required
            value={formData.idade}
            onChange={handleInputChange}
          />
          <br></br>

          <label htmlFor="sexo">Sexo:</label>
          <select
            id="sexo"
            name="sexo"
            required
            value={formData.sexo}
            onChange={handleInputChange}
          >
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
          <br></br>

          <button type="submit">Enviar</button>
          <button className="button2" type="button" onClick={handleGeneratePDF}>Gerar PDF</button>
        </form>
      </header>
    </div>
  );
}

export default App;
