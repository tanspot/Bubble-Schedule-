self.addEventListener("push", function (event) {
  let data = {
    title: "Bubble Schedule 🫧",
    body: "You have a new notification.",
    icon: "/bubble-schedule-icon.png",
    badge: "/bubble-schedule-icon.png",
    url: "/"
  };

  if (event.data) {
    try {
      data = {
        ...data,
        ...event.data.json()
      };
    } catch (error) {
      console.error("Push data error:", error);
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      data: {
        url: data.url || "/"
      }
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const url =
    event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function (clientList) {

      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
