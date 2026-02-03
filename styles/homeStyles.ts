import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  grid: {
    paddingBottom: 120,
    gap: 12,
  },
  columnWrapper: {
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  cardBody: {
    padding: 12,
    gap: 6,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
  },
  addButton: {
    marginTop: 6,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: "700",
  },
  cta: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  ctaText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  toast: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 2,
  },
  toastText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
