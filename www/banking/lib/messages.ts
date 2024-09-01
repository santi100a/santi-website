export default {
    UNAUTHORIZED_QUERY:
        'Imposible consultar: error de autenticación. Revisa el token o nombre de usuario.',
    UNAUTHORIZED_TRANSACTION:
        'Transacción no autorizada. Revisa el token o nombre de usuario.',
    UNAUTHORIZED_DELETION:
        'Imposible eliminar: error de autenticación. Revisa el token o nombre de usuario.',

    INVALID_USERNAME: 'El nombre de usuario no es válido.',
    USERNAME_TAKEN: 'El nombre de usuario no está disponible.',
    NO_SUCH_PAYER: 'El pagador especificado no existe.',
    NO_SUCH_PAYEE: 'El beneficiario especificado no existe.',
    INVALID_AMOUNT: 'El valor a enviar debe ser mayor que cero.',
    NONZERO_BALANCE:
        'Imposible eliminar: el saldo de la cuenta es mayor que cero.',
    DELETION_FORBIDDEN:
        'Imposible eliminar: la cuenta "admin" no puede ser eliminada.',
    INSUFFICIENT_FUNDS: 'Fondos insuficientes.',
    SELF_TRANSACTION:
        'Imposible enviar: no puedes enviarte fondos a ti mismo/a.',
    SERVER_ERROR:
        'Error del servidor. Contacta a <santyrojasprieto+api@gmail.com>.'
};