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
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 14,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "700",
  },
  price: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
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
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  checkoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: "uppercase",
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
