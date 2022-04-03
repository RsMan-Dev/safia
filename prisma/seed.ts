import prisma_instance from "../utils/prisma_instance";


prisma_instance.permissions.createMany({
    data: [
        {name: "auto_giveable", label: "auto_giveable"},
        {name: "ban", label: "ban"},
        {name: "mute", label: "mute"},
        {name: "kick", label: "kick"},
        {name: "config", label: "config"},
    ]
})