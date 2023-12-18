import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const livroResultaods = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      res.status(200).send(livroResultaods);
    } catch (erro) {
      res.status(400).send({ message: `${erro.message} - Id do livro não localizado` });
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (error) {
      res.status(500).send({ message: `${error.message} - falha ao cadastrar livro` });
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;

      const livrosResultados = await livros.find({ "editora": editora });
      res.status(200).send(livrosResultados);

    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };
}

export default LivroController;