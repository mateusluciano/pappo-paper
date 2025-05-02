import { Greeting } from '../components/greeting';
import '../styles/App.css';
import { Section } from '../components/divSection';
import { useState } from 'react';


function ManagerProducts() {
    const [form, setForm] = useState({ cBarra: '', nome: '' });
    const atualizarCampo = (campo, valor) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

    return (
        <>
            <Greeting clientName="Admin" />
            <h1 className='basicTitle'>Gerenciar Produtos</h1>
            <Section form={form} atualizarCampo={atualizarCampo} />

        </>
    )
}

export default ManagerProducts