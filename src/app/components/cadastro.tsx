'use client';

import React, { useState } from 'react';
import { Limelight } from 'next/font/google';

const limelight = Limelight({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCadastro(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

   

    setLoading(true);

    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Cadastro realizado com sucesso!');
        window.location.href = '/login';
      } else {
        alert(data.message || 'Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro no cadastro');
    } finally {
      setLoading(false);
    }
  }
  
 

  return (
    <div id='cadastroal' className={limelight.className}>
      <form onSubmit={handleCadastro}>
        <div className='cadastrobox'>
          <label htmlFor="nome">NOME</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password">SENHA</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
        </div>

        <div className='cadastrobox'>
          <label htmlFor="passwordconf">CONFIRMAR SENHA</label>
          <input
            type="password"
            id="passwordconf"
            name="passwordconf"
            required
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
          />
          <div className='olho'>
            <span id="toogle" className="olho-css"></span>
          </div>
        </div>
        <div className='bord' >
          <button type="submit" disabled={loading}>  {loading ? '...' : 'Start'}
          </button>
        </div> 
     
      </form>
           
      <p>
        Já tem cadastro? <a href='/login'>Entre aqui!</a>
      </p>
    </div>
  );
}