import { useEffect, useState } from 'react';
import wasmImage from 'scripts/wasm-game';

const WasmGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isDestroyed = false;

    async function initWasm() {
      try {
        setIsLoading(true);
        const instance = await wasmImage('game-of-life');
        
        if (!isDestroyed) {
          // WASMインスタンスの保存やその他の初期化処理
          setIsLoading(false);
        }

        return () => {
          // WASMインスタンスのクリーンアップ
          instance?.destroy?.();
        };
      } catch (e) {
        if (!isDestroyed) {
          setError(e instanceof Error ? e : new Error('Failed to initialize WASM'));
          setIsLoading(false);
        }
      }
    }

    const cleanup = initWasm();
    
    return () => {
      isDestroyed = true;
      cleanup?.then(cleanupFn => cleanupFn?.());
    };
  }, []);

  if (error) {
    return <div>Failed to load game: {error.message}</div>;
  }

  return (
    <div>
      {isLoading && <div>Loading game...</div>}
      <canvas 
        id="game-of-life"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default WasmGame;
