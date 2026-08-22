import { useEffect } from "react";
import { useSharedBingoBoard } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };
const STARTER = [
  "Says hello",
  "Shares a win",
  "Drinks water",
  "Makes a pun",
  "Learns a name",
  "Offers help",
  "Tells a story",
  "Asks why",
  "Cheering squad",
];

export function Feature({ room, config }: Props) {
  const bingo = useSharedBingoBoard(room);
  useEffect(() => {
    if (bingo.cells.length === 0)
      bingo.configure(STARTER.map((label, index) => ({ id: `square-${index + 1}`, label })));
  }, [bingo]);
  return (
    <main className="creative-app bingo-app">
      <p className="eyebrow">An easy shared icebreaker</p>
      <h1>Bingo Blitz</h1>
      <p className="lede">
        Mark moments you notice. Your claims stay yours; the room can see the momentum.
      </p>
      <section aria-label="Social bingo board" className="bingo-grid">
        {bingo.cells.map((cell) => (
          <button
            aria-pressed={cell.claimed}
            className={cell.claimed ? "bingo-cell claimed" : "bingo-cell"}
            key={cell.id}
            type="button"
            onClick={() => bingo.toggleMine(cell.id)}
          >
            <span>{cell.label}</span>
            <small>
              {cell.claimCount} claim{cell.claimCount === 1 ? "" : "s"}
            </small>
          </button>
        ))}
      </section>
      <div className="card-actions">
        <button
          disabled={!bingo.cells.some((cell) => cell.claimed)}
          type="button"
          onClick={bingo.clearMine}
        >
          Clear my marks
        </button>
        <button
          type="button"
          onClick={() =>
            bingo.configure(STARTER.map((label, index) => ({ id: `square-${index + 1}`, label })))
          }
        >
          Reset board
        </button>
      </div>
      <p aria-live="polite" className="status">
        {room
          ? `${bingo.cells.filter((cell) => cell.claimed).length} of ${bingo.cells.length} squares marked by you`
          : config.description}
      </p>
    </main>
  );
}
