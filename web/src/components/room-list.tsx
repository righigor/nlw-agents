import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatRelativeDate } from "@/utils/format-relative-date";
import { useRooms } from "@/http/use-rooms";

export function RoomList() {
  const { data, isLoading } = useRooms();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas Recentes</CardTitle>
        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center h-32">
            <span>Carregando...</span>
          </div>
        )}
        {data &&
          data.map((room) => (
            <Link
              key={room.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
              to={`/room/${room.id}`}
            >
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {formatRelativeDate(room.createdAt)}
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    {room.questionsCount} pergunta(s)
                  </Badge>
                </div>
              </div>
              <span className="flex items-center gap-2 text-sm">
                Entrar <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
      </CardContent>
    </Card>
  );
}
