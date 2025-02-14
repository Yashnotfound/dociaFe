export const getStatusColor = (status) => {
    switch (status) {
        case "PENDING":
        return "warning";
        case "APPROVED":
        return "success";
        case "REJECTED":
        return "error";
        default:
        return "default";
    }
}

