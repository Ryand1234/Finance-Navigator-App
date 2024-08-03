const LLM_API_URL = 'https://api.yourfinanceapp.com/llm';

export async function getAIAdvice(context, data) {
  const response = await fetch(LLM_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context, data }),
  });
  const result = await response.json();
  return result.advice;
}