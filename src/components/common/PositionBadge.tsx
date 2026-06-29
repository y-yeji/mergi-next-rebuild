import { POSITION } from "@/constants/position";
import { Badge } from "../ui/badge";

interface PositionBadgeProps {
  className?: string;
  positions: string[];
}

const PositionBadge = ({ className, positions }: PositionBadgeProps) => {
  return (
    <ul className={className}>
      {positions.map((position) => (
        <li key={position}>
          <Badge variant="position">{position}</Badge>
        </li>
      ))}
    </ul>
  );
};

export default PositionBadge;
