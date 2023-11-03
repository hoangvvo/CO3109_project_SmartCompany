export const baseApi = {
  async request<D = any>(input: RequestInfo | URL, init?: RequestInit) {
    const res = await fetch(input, {
      credentials: "same-origin",
      ...init,
    });

    if (!res.ok) {
      if (res.status >= 500) {
        throw new Error("Server Error");
      }

      const json = await res.json();
      throw new Error(json.message);
    }

    if (res.headers.get("Content-Type")?.includes("application/json")) {
      return res.json() as Promise<D>;
    }

    return res.text() as Promise<D>;
  },
  async GET<D = any>(path: string, params?: any) {
    const url = new URL(path, window.location.origin);
    if (params) {
      url.search = new URLSearchParams(params).toString();
    }

    return this.request<D>(url);
  },
  async POST<D = any>(path: string, data?: any) {
    return this.request<D>(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: "same-origin",
    });
  },
};
