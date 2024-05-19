export default function formatDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return {
    date: formattedDate,
    time: formattedTime
  };
}