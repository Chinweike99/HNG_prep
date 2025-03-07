export const integration_config = {
  data: {
    date: {
      created_at: "2025-02-19",
      updated_at: "2025-02-19",
    },
    descriptions: {
      app_description:
        "Fetches the current exchange rate for Naira to USD, EUR, and GBP from Exchange API at 60-minutes intervals and sends real-time notification to users",
      app_logo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwI_vCma_nQpVcVYV6D0WVxHxhku-0HGwzAw&s",
      app_name: "currency rate tracker.",
      app_url: "https://exchange-rate-tracker.com",
      background_color: "#HEXCODE",
    },
    integration_category: "Monitoring & Logging",
    integration_type: "interval",
    is_active: true,
    key_features: ["Gets current naira exchange rate.", "Notifies user."],
    permissions: {
      monitoring_user: {
        always_online: true,
        display_name: "Performance Monitor",
      },
    },
    settings: [
      {
        label: "interval",
        type: "text",
        required: true,
        default: "0 * * * *",
      },
      {
        label: "Key",
        type: "text",
        required: true,
        default: "1234567890",
      },
      {
        label: "Do you want to continue",
        type: "checkbox",
        required: true,
        default: "Yes",
      },
      {
        label: "Provide Speed",
        type: "number",
        required: true,
        default: "1000",
      },
      {
        label: "Sensitivity Level",
        type: "dropdown",
        required: true,
        default: "Low",
        options: ["High", "Low"],
      },
      {
        label: "Alert Admin",
        type: "multi-checkbox",
        required: true,
        default: "Super-Admin",
        options: ["Super-Admin", "Admin", "Manager", "Developer"],
      },
    ],
    //   "tick_url": "https://s4jblf42-3000.uks1.devtunnels.ms/",
    //   "target_url": "https://s4jblf42-3000.uks1.devtunnels.ms/notifier-hook"
    //   "target_url": "https://ping.telex.im/v1/webhooks/01951d09-6c39-77a0-990c-7da52f8ad219/notifier-hook"
    tick_url: "https://s4jblf42-3000.uks1.devtunnels.ms/tick",
    target_url: "https://s4jblf42-3000.uks1.devtunnels.ms/notifier-hook/"
  },
};
