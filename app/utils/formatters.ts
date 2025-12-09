  export const formatCurrencyValue = (value: number) => {
    if (!value)
      return;
    
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }