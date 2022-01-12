/**
 *
 * Arquivo responsável por toda configuração e execução do Back-End
 * (API virtual-library)
 *
 */

const app = require('./src/app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
