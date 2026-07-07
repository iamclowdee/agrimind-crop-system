import HistoryCard from "./HistoryCard";
import HistoryAnalytics from "./HistoryAnalytics";

function HistoryList({
  history,
  openRevenue,
}) {
  const hasPending =
    history.some((h) => !h.completed);

  const hasCompleted =
    history.some((h) => h.completed);

  return (
    <>
      {history.map((entry, index) => (
        <HistoryCard
          key={entry.id}
          entry={entry}
          index={index}
          openRevenue={openRevenue}
        />
      ))}

      {hasPending && (
        <div className="alert alert-warning">
          ⏳ Some crops are pending revenue.
        </div>
      )}

      {hasCompleted && (
        <HistoryAnalytics
          history={history}
        />
      )}
    </>
  );
}

export default HistoryList;