import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function predictShelfLife(productData: {
  temperature: number;
  humidity: number;
  productType: string;
  ageDays: number;
}) {
  const prompt = `You are an expert AI Food Scientist. Predict the remaining shelf life of ${productData.productType} stored at ${productData.temperature}°C and ${productData.humidity}% humidity. The product is already ${productData.ageDays} days old. Return only JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          remainingDays: { type: Type.NUMBER, description: "Predicted remaining days of freshness" },
          riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Critical"] },
          recommendation: { type: Type.STRING, description: "Actionable advice for storage optimization" },
          analysis: { type: Type.STRING, description: "Brief scientific explanation" },
        },
        required: ["remainingDays", "riskLevel", "recommendation", "analysis"],
      },
    },
  });

  return JSON.parse(response.text);
}

export async function detectAnomalies(sensorHistory: { temp: number; humidity: number; timestamp: string }[]) {
  const prompt = `Analyze this sensor history for cold storage anomalies (sudden spikes, sensor failure, or abnormal fluctuations): ${JSON.stringify(sensorHistory)}. Return a list of anomalies found.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          anomaliesFound: { type: Type.BOOLEAN },
          alerts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ["Temperature Spike", "Sensor Error", "Humidity Fluctuation"] },
                severity: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                message: { type: Type.STRING },
                timestamp: { type: Type.STRING },
              }
            }
          }
        },
        required: ["anomaliesFound", "alerts"],
      },
    },
  });

  return JSON.parse(response.text);
}

export async function analyzeProductImage(base64Image: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { text: "Analyze this product image for signs of rot, bruising, or spoilage. Identify the product and its freshness state." },
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          product: { type: Type.STRING },
          condition: { type: Type.STRING, enum: ["Fresh", "Ripening", "Overripe", "Spoiled", "Contaminated"] },
          score: { type: Type.NUMBER, description: "Freshness score from 0 to 100" },
          observations: { type: Type.STRING },
        },
        required: ["product", "condition", "score", "observations"],
      },
    },
  });

  return JSON.parse(response.text);
}
