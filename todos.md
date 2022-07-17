[√] 1. checar se tem email e password da requisicao.

<!-- [] 2. checar se o email eh valido. (opcional) -->

[√] 3. checar se o email enviado existe no banco de dados.
[√] 4. se existir, encontrar a senha-hash referente ao usuario encontrado.
[√] 5. se nao existir, enviar resposta com erro. Usuario nao encontrado por ex.
[√] 6. comparar senha digitada com senha-hash encontrada.
[√] 7. se a comparacao der "true", criar um bearer token (JWT) e enviar para o client.
[√] 8. se a comparacao der "false", enviar mesmo erro. usuario nao encontrado por ex.
