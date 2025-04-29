import '../styles/form.css';

export function InputPreco({ value, onChange, placeholder }) {
    const formatarValor = (valor) => {
      valor = valor.replace(/\D/g, '');
      if (valor.length === 0) valor = '0';
      const valorNumerico = parseFloat(valor) / 100;
      return valorNumerico.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };
  
    return (
      <div style={{ position: 'relative' }}>
        <span className="prefixo-reais">R$</span>
        <input
          className='inputForm input-micro'
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(formatarValor(e.target.value))}
          inputMode="numeric"
          style={{ paddingLeft: '30px' }}
        />
      </div>
    );
  }
  