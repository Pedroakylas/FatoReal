const { checkWithAI } = require('../services/aiService');

// faz a verificação dos texto, mas não os salva ainda
const checkText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 5) {
      return res.status(400).json({ error: 'Texto muito curto para análise.' });
    }

    if (text.length > 2000) {
      return res.status(400).json({ error: 'Texto muito longo. Máximo 2000 caracteres.' });
    }

    const result = await checkWithAI(text, 'text');

    //gera um id temporário só para a tela de resultado, pois não tem banco de dados ainda
    const shareId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

    return res.json({
      success: true,
      checkId: null,
      shareId,
      verdict: result.verdict,
      confidenceScore: result.confidenceScore,
      summary: result.summary,
      explanation: result.explanation,
      keyPoints: result.keyPoints,
      sources: result.sources,
      inputType: 'text',
      inputContent: text,
      createdAt: new Date()
    });

  } catch (error) {
    console.error('Erro checkText:', error);
    return res.status(500).json({ error: error.message || 'Erro ao verificar texto.' });
  }
};

module.exports = { checkText };
