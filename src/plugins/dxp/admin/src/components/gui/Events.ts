
type EventHandler<T = any> = (payload: T) => void

class Events {

    static ON_AFTER_PAGE_ADDED: string = "onAfterPageAdded"
    static ON_AFTER_PAGE_UPDATED: string = "onAfterPageUpdated"

    static map = new Map<string, EventHandler[]>()

    static subscribe(key: string, handler: EventHandler): void {

      if (Events.map.get(key) === undefined) {
        Events.map.set(key, [])
      }

      Events.map.get(key)?.push(handler)
    }

    static unsubscribe(key: string, handler: EventHandler): void {

      const index = Events.map.get(key)?.indexOf(handler) ?? -1
      Events.map.get(key)?.splice(index >>> 0, 1)
    }

    static raise(key: string, payload: any) {

      Events.map.get(key)?.forEach((fn) => {
        try {
          fn(payload)
        } catch (e) {
          console.error(e)
        }
      })
    }
}

export default Events