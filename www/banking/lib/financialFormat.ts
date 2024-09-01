export default function financialFormat(amount: number) {
    return Intl.NumberFormat('es-US', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'SED'
    }).format(Number(Number(amount).toFixed(2)));
};