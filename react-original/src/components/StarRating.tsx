interface Props {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 13 }: Props) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.4 4.4 12.5l.7-4L2.2 5.7l4-.6L8 1.5z"
            fill={n <= Math.round(rating) ? "#40916C" : "#DCF0E4"}
          />
        </svg>
      ))}
    </span>
  );
}
