import { StyleSheet } from "react-native";

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    gap: 12,
    paddingBottom: 140,
  },
  card: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    marginTop: 6,
    fontSize: 13,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  controlButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  controlText: {
    fontSize: 18,
    fontWeight: "600",
  },
  quantity: {
    fontSize: 15,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
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
});
