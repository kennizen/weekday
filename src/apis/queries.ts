const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export type Result<T, E extends Error> = [T, null] | [null, E];

export async function getJobs<T>(offset: number = 1, limit: number = 10): Promise<Result<T, Error>> {
  const body = JSON.stringify({
    limit: limit,
    offset: offset,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body,
    signal: AbortSignal.timeout(5000),
  };

  try {
    const resp = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
    const data = (await resp.json()) as Awaited<T>;

    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}
