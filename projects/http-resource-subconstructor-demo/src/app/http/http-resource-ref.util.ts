import { HttpResourceRef } from "@angular/common/http";
import { computed, Signal } from "@angular/core";

export function makeResourceRefStatus<T = any>(resourceRef: HttpResourceRef<T | undefined>){
  return {
    progress: computed(() => {
      if (resourceRef.progress()) {
        const progress = resourceRef.progress();
        return `${progress?.loaded}/${progress?.total}`
      }
      return '';
    }),
    error: computed(() => 
      resourceRef.error() ? resourceRef.error() as Error : undefined
    ),
    value: computed(() => 
      resourceRef.hasValue() ? resourceRef.value() as T : undefined
    )
  }
}
