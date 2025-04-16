export async function getTailors() {
  const res = await fetch(
    `https://api.getgrist.com/api/docs/${process.env.GRIST_DOC_ID}/tables/Tailors/records`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.GRIST_API_KEY}`
      }
    }
  );
  return res.json();
}
