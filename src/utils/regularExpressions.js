//REGEX PARA NÚMERO DE TELEFONE
export const phoneNumber = /^\((\d{2})\)\s(\d{4,5})-(\d{4})$/;

//REGEX PARA DATA DE NASCIMENTO
export const birthday = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

//REGEX PARA CPF
export const cpfNumber = /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/;