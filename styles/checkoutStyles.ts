import { StyleSheet } from "react-native";

export const checkoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    gap: 12,
    paddingBottom: 150,
  },
  row: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  rowBody: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
  },
  quantity: {
    marginTop: 4,
    fontSize: 12,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
  },
  selectButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  summary: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "700",
  },
  checkoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  selectAllRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    alignItems: "center",
    gap: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
