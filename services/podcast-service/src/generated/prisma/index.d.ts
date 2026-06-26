
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Channel
 * 
 */
export type Channel = $Result.DefaultSelection<Prisma.$ChannelPayload>
/**
 * Model ChannelSubscription
 * 
 */
export type ChannelSubscription = $Result.DefaultSelection<Prisma.$ChannelSubscriptionPayload>
/**
 * Model Podcast
 * 
 */
export type Podcast = $Result.DefaultSelection<Prisma.$PodcastPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PodcastStatus: {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  ENDED: 'ENDED',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED'
};

export type PodcastStatus = (typeof PodcastStatus)[keyof typeof PodcastStatus]


export const Visibility: {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  UNLISTED: 'UNLISTED'
};

export type Visibility = (typeof Visibility)[keyof typeof Visibility]

}

export type PodcastStatus = $Enums.PodcastStatus

export const PodcastStatus: typeof $Enums.PodcastStatus

export type Visibility = $Enums.Visibility

export const Visibility: typeof $Enums.Visibility

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Channels
 * const channels = await prisma.channel.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Channels
   * const channels = await prisma.channel.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.channel`: Exposes CRUD operations for the **Channel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channels
    * const channels = await prisma.channel.findMany()
    * ```
    */
  get channel(): Prisma.ChannelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.channelSubscription`: Exposes CRUD operations for the **ChannelSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChannelSubscriptions
    * const channelSubscriptions = await prisma.channelSubscription.findMany()
    * ```
    */
  get channelSubscription(): Prisma.ChannelSubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.podcast`: Exposes CRUD operations for the **Podcast** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Podcasts
    * const podcasts = await prisma.podcast.findMany()
    * ```
    */
  get podcast(): Prisma.PodcastDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Channel: 'Channel',
    ChannelSubscription: 'ChannelSubscription',
    Podcast: 'Podcast'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "channel" | "channelSubscription" | "podcast"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Channel: {
        payload: Prisma.$ChannelPayload<ExtArgs>
        fields: Prisma.ChannelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChannelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChannelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          findFirst: {
            args: Prisma.ChannelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChannelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          findMany: {
            args: Prisma.ChannelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          create: {
            args: Prisma.ChannelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          createMany: {
            args: Prisma.ChannelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChannelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          delete: {
            args: Prisma.ChannelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          update: {
            args: Prisma.ChannelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          deleteMany: {
            args: Prisma.ChannelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChannelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChannelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          upsert: {
            args: Prisma.ChannelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          aggregate: {
            args: Prisma.ChannelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChannel>
          }
          groupBy: {
            args: Prisma.ChannelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChannelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChannelCountArgs<ExtArgs>
            result: $Utils.Optional<ChannelCountAggregateOutputType> | number
          }
        }
      }
      ChannelSubscription: {
        payload: Prisma.$ChannelSubscriptionPayload<ExtArgs>
        fields: Prisma.ChannelSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChannelSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChannelSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.ChannelSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChannelSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>
          }
          findMany: {
            args: Prisma.ChannelSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>[]
          }
          create: {
            args: Prisma.ChannelSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>
          }
          createMany: {
            args: Prisma.ChannelSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChannelSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.ChannelSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>
          }
          update: {
            args: Prisma.ChannelSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.ChannelSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChannelSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChannelSubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.ChannelSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.ChannelSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChannelSubscription>
          }
          groupBy: {
            args: Prisma.ChannelSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChannelSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChannelSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<ChannelSubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Podcast: {
        payload: Prisma.$PodcastPayload<ExtArgs>
        fields: Prisma.PodcastFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PodcastFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PodcastFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          findFirst: {
            args: Prisma.PodcastFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PodcastFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          findMany: {
            args: Prisma.PodcastFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>[]
          }
          create: {
            args: Prisma.PodcastCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          createMany: {
            args: Prisma.PodcastCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PodcastCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>[]
          }
          delete: {
            args: Prisma.PodcastDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          update: {
            args: Prisma.PodcastUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          deleteMany: {
            args: Prisma.PodcastDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PodcastUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PodcastUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>[]
          }
          upsert: {
            args: Prisma.PodcastUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          aggregate: {
            args: Prisma.PodcastAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePodcast>
          }
          groupBy: {
            args: Prisma.PodcastGroupByArgs<ExtArgs>
            result: $Utils.Optional<PodcastGroupByOutputType>[]
          }
          count: {
            args: Prisma.PodcastCountArgs<ExtArgs>
            result: $Utils.Optional<PodcastCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    channel?: ChannelOmit
    channelSubscription?: ChannelSubscriptionOmit
    podcast?: PodcastOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ChannelCountOutputType
   */

  export type ChannelCountOutputType = {
    podcasts: number
    subscriptions: number
  }

  export type ChannelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    podcasts?: boolean | ChannelCountOutputTypeCountPodcastsArgs
    subscriptions?: boolean | ChannelCountOutputTypeCountSubscriptionsArgs
  }

  // Custom InputTypes
  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelCountOutputType
     */
    select?: ChannelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeCountPodcastsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PodcastWhereInput
  }

  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelSubscriptionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Channel
   */

  export type AggregateChannel = {
    _count: ChannelCountAggregateOutputType | null
    _avg: ChannelAvgAggregateOutputType | null
    _sum: ChannelSumAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  export type ChannelAvgAggregateOutputType = {
    subscriberCount: number | null
    podcastCount: number | null
  }

  export type ChannelSumAggregateOutputType = {
    subscriberCount: number | null
    podcastCount: number | null
  }

  export type ChannelMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    bannerUrl: string | null
    profilePictureUrl: string | null
    subscriberCount: number | null
    podcastCount: number | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ChannelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    bannerUrl: string | null
    profilePictureUrl: string | null
    subscriberCount: number | null
    podcastCount: number | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ChannelCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    bannerUrl: number
    profilePictureUrl: number
    subscriberCount: number
    podcastCount: number
    ownerId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type ChannelAvgAggregateInputType = {
    subscriberCount?: true
    podcastCount?: true
  }

  export type ChannelSumAggregateInputType = {
    subscriberCount?: true
    podcastCount?: true
  }

  export type ChannelMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    bannerUrl?: true
    profilePictureUrl?: true
    subscriberCount?: true
    podcastCount?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ChannelMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    bannerUrl?: true
    profilePictureUrl?: true
    subscriberCount?: true
    podcastCount?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ChannelCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    bannerUrl?: true
    profilePictureUrl?: true
    subscriberCount?: true
    podcastCount?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ChannelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Channel to aggregate.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Channels
    **/
    _count?: true | ChannelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChannelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChannelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelMaxAggregateInputType
  }

  export type GetChannelAggregateType<T extends ChannelAggregateArgs> = {
        [P in keyof T & keyof AggregateChannel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannel[P]>
      : GetScalarType<T[P], AggregateChannel[P]>
  }




  export type ChannelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithAggregationInput | ChannelOrderByWithAggregationInput[]
    by: ChannelScalarFieldEnum[] | ChannelScalarFieldEnum
    having?: ChannelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelCountAggregateInputType | true
    _avg?: ChannelAvgAggregateInputType
    _sum?: ChannelSumAggregateInputType
    _min?: ChannelMinAggregateInputType
    _max?: ChannelMaxAggregateInputType
  }

  export type ChannelGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string
    bannerUrl: string | null
    profilePictureUrl: string | null
    subscriberCount: number
    podcastCount: number
    ownerId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: ChannelCountAggregateOutputType | null
    _avg: ChannelAvgAggregateOutputType | null
    _sum: ChannelSumAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  type GetChannelGroupByPayload<T extends ChannelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChannelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelGroupByOutputType[P]>
        }
      >
    >


  export type ChannelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    bannerUrl?: boolean
    profilePictureUrl?: boolean
    subscriberCount?: boolean
    podcastCount?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    podcasts?: boolean | Channel$podcastsArgs<ExtArgs>
    subscriptions?: boolean | Channel$subscriptionsArgs<ExtArgs>
    _count?: boolean | ChannelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    bannerUrl?: boolean
    profilePictureUrl?: boolean
    subscriberCount?: boolean
    podcastCount?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    bannerUrl?: boolean
    profilePictureUrl?: boolean
    subscriberCount?: boolean
    podcastCount?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    bannerUrl?: boolean
    profilePictureUrl?: boolean
    subscriberCount?: boolean
    podcastCount?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type ChannelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "bannerUrl" | "profilePictureUrl" | "subscriberCount" | "podcastCount" | "ownerId" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["channel"]>
  export type ChannelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    podcasts?: boolean | Channel$podcastsArgs<ExtArgs>
    subscriptions?: boolean | Channel$subscriptionsArgs<ExtArgs>
    _count?: boolean | ChannelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChannelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChannelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChannelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Channel"
    objects: {
      podcasts: Prisma.$PodcastPayload<ExtArgs>[]
      subscriptions: Prisma.$ChannelSubscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string
      bannerUrl: string | null
      profilePictureUrl: string | null
      subscriberCount: number
      podcastCount: number
      ownerId: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["channel"]>
    composites: {}
  }

  type ChannelGetPayload<S extends boolean | null | undefined | ChannelDefaultArgs> = $Result.GetResult<Prisma.$ChannelPayload, S>

  type ChannelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChannelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChannelCountAggregateInputType | true
    }

  export interface ChannelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Channel'], meta: { name: 'Channel' } }
    /**
     * Find zero or one Channel that matches the filter.
     * @param {ChannelFindUniqueArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChannelFindUniqueArgs>(args: SelectSubset<T, ChannelFindUniqueArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Channel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChannelFindUniqueOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChannelFindUniqueOrThrowArgs>(args: SelectSubset<T, ChannelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChannelFindFirstArgs>(args?: SelectSubset<T, ChannelFindFirstArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChannelFindFirstOrThrowArgs>(args?: SelectSubset<T, ChannelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Channels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Channels
     * const channels = await prisma.channel.findMany()
     * 
     * // Get first 10 Channels
     * const channels = await prisma.channel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const channelWithIdOnly = await prisma.channel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChannelFindManyArgs>(args?: SelectSubset<T, ChannelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Channel.
     * @param {ChannelCreateArgs} args - Arguments to create a Channel.
     * @example
     * // Create one Channel
     * const Channel = await prisma.channel.create({
     *   data: {
     *     // ... data to create a Channel
     *   }
     * })
     * 
     */
    create<T extends ChannelCreateArgs>(args: SelectSubset<T, ChannelCreateArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Channels.
     * @param {ChannelCreateManyArgs} args - Arguments to create many Channels.
     * @example
     * // Create many Channels
     * const channel = await prisma.channel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChannelCreateManyArgs>(args?: SelectSubset<T, ChannelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Channels and returns the data saved in the database.
     * @param {ChannelCreateManyAndReturnArgs} args - Arguments to create many Channels.
     * @example
     * // Create many Channels
     * const channel = await prisma.channel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Channels and only return the `id`
     * const channelWithIdOnly = await prisma.channel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChannelCreateManyAndReturnArgs>(args?: SelectSubset<T, ChannelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Channel.
     * @param {ChannelDeleteArgs} args - Arguments to delete one Channel.
     * @example
     * // Delete one Channel
     * const Channel = await prisma.channel.delete({
     *   where: {
     *     // ... filter to delete one Channel
     *   }
     * })
     * 
     */
    delete<T extends ChannelDeleteArgs>(args: SelectSubset<T, ChannelDeleteArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Channel.
     * @param {ChannelUpdateArgs} args - Arguments to update one Channel.
     * @example
     * // Update one Channel
     * const channel = await prisma.channel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChannelUpdateArgs>(args: SelectSubset<T, ChannelUpdateArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Channels.
     * @param {ChannelDeleteManyArgs} args - Arguments to filter Channels to delete.
     * @example
     * // Delete a few Channels
     * const { count } = await prisma.channel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChannelDeleteManyArgs>(args?: SelectSubset<T, ChannelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChannelUpdateManyArgs>(args: SelectSubset<T, ChannelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels and returns the data updated in the database.
     * @param {ChannelUpdateManyAndReturnArgs} args - Arguments to update many Channels.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Channels and only return the `id`
     * const channelWithIdOnly = await prisma.channel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChannelUpdateManyAndReturnArgs>(args: SelectSubset<T, ChannelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Channel.
     * @param {ChannelUpsertArgs} args - Arguments to update or create a Channel.
     * @example
     * // Update or create a Channel
     * const channel = await prisma.channel.upsert({
     *   create: {
     *     // ... data to create a Channel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Channel we want to update
     *   }
     * })
     */
    upsert<T extends ChannelUpsertArgs>(args: SelectSubset<T, ChannelUpsertArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelCountArgs} args - Arguments to filter Channels to count.
     * @example
     * // Count the number of Channels
     * const count = await prisma.channel.count({
     *   where: {
     *     // ... the filter for the Channels we want to count
     *   }
     * })
    **/
    count<T extends ChannelCountArgs>(
      args?: Subset<T, ChannelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChannelAggregateArgs>(args: Subset<T, ChannelAggregateArgs>): Prisma.PrismaPromise<GetChannelAggregateType<T>>

    /**
     * Group by Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChannelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelGroupByArgs['orderBy'] }
        : { orderBy?: ChannelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Channel model
   */
  readonly fields: ChannelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Channel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChannelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    podcasts<T extends Channel$podcastsArgs<ExtArgs> = {}>(args?: Subset<T, Channel$podcastsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends Channel$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Channel$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Channel model
   */
  interface ChannelFieldRefs {
    readonly id: FieldRef<"Channel", 'String'>
    readonly name: FieldRef<"Channel", 'String'>
    readonly slug: FieldRef<"Channel", 'String'>
    readonly description: FieldRef<"Channel", 'String'>
    readonly bannerUrl: FieldRef<"Channel", 'String'>
    readonly profilePictureUrl: FieldRef<"Channel", 'String'>
    readonly subscriberCount: FieldRef<"Channel", 'Int'>
    readonly podcastCount: FieldRef<"Channel", 'Int'>
    readonly ownerId: FieldRef<"Channel", 'String'>
    readonly createdAt: FieldRef<"Channel", 'DateTime'>
    readonly updatedAt: FieldRef<"Channel", 'DateTime'>
    readonly deletedAt: FieldRef<"Channel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Channel findUnique
   */
  export type ChannelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findUniqueOrThrow
   */
  export type ChannelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findFirst
   */
  export type ChannelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel findFirstOrThrow
   */
  export type ChannelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel findMany
   */
  export type ChannelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channels to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel create
   */
  export type ChannelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The data needed to create a Channel.
     */
    data: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
  }

  /**
   * Channel createMany
   */
  export type ChannelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Channels.
     */
    data: ChannelCreateManyInput | ChannelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Channel createManyAndReturn
   */
  export type ChannelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * The data used to create many Channels.
     */
    data: ChannelCreateManyInput | ChannelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Channel update
   */
  export type ChannelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The data needed to update a Channel.
     */
    data: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
    /**
     * Choose, which Channel to update.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel updateMany
   */
  export type ChannelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to update.
     */
    limit?: number
  }

  /**
   * Channel updateManyAndReturn
   */
  export type ChannelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to update.
     */
    limit?: number
  }

  /**
   * Channel upsert
   */
  export type ChannelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The filter to search for the Channel to update in case it exists.
     */
    where: ChannelWhereUniqueInput
    /**
     * In case the Channel found by the `where` argument doesn't exist, create a new Channel with this data.
     */
    create: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
    /**
     * In case the Channel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
  }

  /**
   * Channel delete
   */
  export type ChannelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter which Channel to delete.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel deleteMany
   */
  export type ChannelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Channels to delete
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to delete.
     */
    limit?: number
  }

  /**
   * Channel.podcasts
   */
  export type Channel$podcastsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    where?: PodcastWhereInput
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    cursor?: PodcastWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PodcastScalarFieldEnum | PodcastScalarFieldEnum[]
  }

  /**
   * Channel.subscriptions
   */
  export type Channel$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    where?: ChannelSubscriptionWhereInput
    orderBy?: ChannelSubscriptionOrderByWithRelationInput | ChannelSubscriptionOrderByWithRelationInput[]
    cursor?: ChannelSubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelSubscriptionScalarFieldEnum | ChannelSubscriptionScalarFieldEnum[]
  }

  /**
   * Channel without action
   */
  export type ChannelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
  }


  /**
   * Model ChannelSubscription
   */

  export type AggregateChannelSubscription = {
    _count: ChannelSubscriptionCountAggregateOutputType | null
    _min: ChannelSubscriptionMinAggregateOutputType | null
    _max: ChannelSubscriptionMaxAggregateOutputType | null
  }

  export type ChannelSubscriptionMinAggregateOutputType = {
    userId: string | null
    channelId: string | null
    createdAt: Date | null
  }

  export type ChannelSubscriptionMaxAggregateOutputType = {
    userId: string | null
    channelId: string | null
    createdAt: Date | null
  }

  export type ChannelSubscriptionCountAggregateOutputType = {
    userId: number
    channelId: number
    createdAt: number
    _all: number
  }


  export type ChannelSubscriptionMinAggregateInputType = {
    userId?: true
    channelId?: true
    createdAt?: true
  }

  export type ChannelSubscriptionMaxAggregateInputType = {
    userId?: true
    channelId?: true
    createdAt?: true
  }

  export type ChannelSubscriptionCountAggregateInputType = {
    userId?: true
    channelId?: true
    createdAt?: true
    _all?: true
  }

  export type ChannelSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChannelSubscription to aggregate.
     */
    where?: ChannelSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelSubscriptions to fetch.
     */
    orderBy?: ChannelSubscriptionOrderByWithRelationInput | ChannelSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChannelSubscriptions
    **/
    _count?: true | ChannelSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelSubscriptionMaxAggregateInputType
  }

  export type GetChannelSubscriptionAggregateType<T extends ChannelSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateChannelSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannelSubscription[P]>
      : GetScalarType<T[P], AggregateChannelSubscription[P]>
  }




  export type ChannelSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelSubscriptionWhereInput
    orderBy?: ChannelSubscriptionOrderByWithAggregationInput | ChannelSubscriptionOrderByWithAggregationInput[]
    by: ChannelSubscriptionScalarFieldEnum[] | ChannelSubscriptionScalarFieldEnum
    having?: ChannelSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelSubscriptionCountAggregateInputType | true
    _min?: ChannelSubscriptionMinAggregateInputType
    _max?: ChannelSubscriptionMaxAggregateInputType
  }

  export type ChannelSubscriptionGroupByOutputType = {
    userId: string
    channelId: string
    createdAt: Date
    _count: ChannelSubscriptionCountAggregateOutputType | null
    _min: ChannelSubscriptionMinAggregateOutputType | null
    _max: ChannelSubscriptionMaxAggregateOutputType | null
  }

  type GetChannelSubscriptionGroupByPayload<T extends ChannelSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChannelSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type ChannelSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    channelId?: boolean
    createdAt?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channelSubscription"]>

  export type ChannelSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    channelId?: boolean
    createdAt?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channelSubscription"]>

  export type ChannelSubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    channelId?: boolean
    createdAt?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channelSubscription"]>

  export type ChannelSubscriptionSelectScalar = {
    userId?: boolean
    channelId?: boolean
    createdAt?: boolean
  }

  export type ChannelSubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "channelId" | "createdAt", ExtArgs["result"]["channelSubscription"]>
  export type ChannelSubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }
  export type ChannelSubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }
  export type ChannelSubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }

  export type $ChannelSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChannelSubscription"
    objects: {
      channel: Prisma.$ChannelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      channelId: string
      createdAt: Date
    }, ExtArgs["result"]["channelSubscription"]>
    composites: {}
  }

  type ChannelSubscriptionGetPayload<S extends boolean | null | undefined | ChannelSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$ChannelSubscriptionPayload, S>

  type ChannelSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChannelSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChannelSubscriptionCountAggregateInputType | true
    }

  export interface ChannelSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChannelSubscription'], meta: { name: 'ChannelSubscription' } }
    /**
     * Find zero or one ChannelSubscription that matches the filter.
     * @param {ChannelSubscriptionFindUniqueArgs} args - Arguments to find a ChannelSubscription
     * @example
     * // Get one ChannelSubscription
     * const channelSubscription = await prisma.channelSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChannelSubscriptionFindUniqueArgs>(args: SelectSubset<T, ChannelSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__ChannelSubscriptionClient<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChannelSubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChannelSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a ChannelSubscription
     * @example
     * // Get one ChannelSubscription
     * const channelSubscription = await prisma.channelSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChannelSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, ChannelSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChannelSubscriptionClient<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChannelSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelSubscriptionFindFirstArgs} args - Arguments to find a ChannelSubscription
     * @example
     * // Get one ChannelSubscription
     * const channelSubscription = await prisma.channelSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChannelSubscriptionFindFirstArgs>(args?: SelectSubset<T, ChannelSubscriptionFindFirstArgs<ExtArgs>>): Prisma__ChannelSubscriptionClient<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChannelSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelSubscriptionFindFirstOrThrowArgs} args - Arguments to find a ChannelSubscription
     * @example
     * // Get one ChannelSubscription
     * const channelSubscription = await prisma.channelSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChannelSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, ChannelSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChannelSubscriptionClient<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChannelSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChannelSubscriptions
     * const channelSubscriptions = await prisma.channelSubscription.findMany()
     * 
     * // Get first 10 ChannelSubscriptions
     * const channelSubscriptions = await prisma.channelSubscription.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const channelSubscriptionWithUserIdOnly = await prisma.channelSubscription.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends ChannelSubscriptionFindManyArgs>(args?: SelectSubset<T, ChannelSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChannelSubscription.
     * @param {ChannelSubscriptionCreateArgs} args - Arguments to create a ChannelSubscription.
     * @example
     * // Create one ChannelSubscription
     * const ChannelSubscription = await prisma.channelSubscription.create({
     *   data: {
     *     // ... data to create a ChannelSubscription
     *   }
     * })
     * 
     */
    create<T extends ChannelSubscriptionCreateArgs>(args: SelectSubset<T, ChannelSubscriptionCreateArgs<ExtArgs>>): Prisma__ChannelSubscriptionClient<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChannelSubscriptions.
     * @param {ChannelSubscriptionCreateManyArgs} args - Arguments to create many ChannelSubscriptions.
     * @example
     * // Create many ChannelSubscriptions
     * const channelSubscription = await prisma.channelSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChannelSubscriptionCreateManyArgs>(args?: SelectSubset<T, ChannelSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChannelSubscriptions and returns the data saved in the database.
     * @param {ChannelSubscriptionCreateManyAndReturnArgs} args - Arguments to create many ChannelSubscriptions.
     * @example
     * // Create many ChannelSubscriptions
     * const channelSubscription = await prisma.channelSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChannelSubscriptions and only return the `userId`
     * const channelSubscriptionWithUserIdOnly = await prisma.channelSubscription.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChannelSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, ChannelSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChannelSubscription.
     * @param {ChannelSubscriptionDeleteArgs} args - Arguments to delete one ChannelSubscription.
     * @example
     * // Delete one ChannelSubscription
     * const ChannelSubscription = await prisma.channelSubscription.delete({
     *   where: {
     *     // ... filter to delete one ChannelSubscription
     *   }
     * })
     * 
     */
    delete<T extends ChannelSubscriptionDeleteArgs>(args: SelectSubset<T, ChannelSubscriptionDeleteArgs<ExtArgs>>): Prisma__ChannelSubscriptionClient<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChannelSubscription.
     * @param {ChannelSubscriptionUpdateArgs} args - Arguments to update one ChannelSubscription.
     * @example
     * // Update one ChannelSubscription
     * const channelSubscription = await prisma.channelSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChannelSubscriptionUpdateArgs>(args: SelectSubset<T, ChannelSubscriptionUpdateArgs<ExtArgs>>): Prisma__ChannelSubscriptionClient<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChannelSubscriptions.
     * @param {ChannelSubscriptionDeleteManyArgs} args - Arguments to filter ChannelSubscriptions to delete.
     * @example
     * // Delete a few ChannelSubscriptions
     * const { count } = await prisma.channelSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChannelSubscriptionDeleteManyArgs>(args?: SelectSubset<T, ChannelSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChannelSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChannelSubscriptions
     * const channelSubscription = await prisma.channelSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChannelSubscriptionUpdateManyArgs>(args: SelectSubset<T, ChannelSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChannelSubscriptions and returns the data updated in the database.
     * @param {ChannelSubscriptionUpdateManyAndReturnArgs} args - Arguments to update many ChannelSubscriptions.
     * @example
     * // Update many ChannelSubscriptions
     * const channelSubscription = await prisma.channelSubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChannelSubscriptions and only return the `userId`
     * const channelSubscriptionWithUserIdOnly = await prisma.channelSubscription.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChannelSubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, ChannelSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChannelSubscription.
     * @param {ChannelSubscriptionUpsertArgs} args - Arguments to update or create a ChannelSubscription.
     * @example
     * // Update or create a ChannelSubscription
     * const channelSubscription = await prisma.channelSubscription.upsert({
     *   create: {
     *     // ... data to create a ChannelSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChannelSubscription we want to update
     *   }
     * })
     */
    upsert<T extends ChannelSubscriptionUpsertArgs>(args: SelectSubset<T, ChannelSubscriptionUpsertArgs<ExtArgs>>): Prisma__ChannelSubscriptionClient<$Result.GetResult<Prisma.$ChannelSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChannelSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelSubscriptionCountArgs} args - Arguments to filter ChannelSubscriptions to count.
     * @example
     * // Count the number of ChannelSubscriptions
     * const count = await prisma.channelSubscription.count({
     *   where: {
     *     // ... the filter for the ChannelSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends ChannelSubscriptionCountArgs>(
      args?: Subset<T, ChannelSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChannelSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChannelSubscriptionAggregateArgs>(args: Subset<T, ChannelSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetChannelSubscriptionAggregateType<T>>

    /**
     * Group by ChannelSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelSubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChannelSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: ChannelSubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChannelSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChannelSubscription model
   */
  readonly fields: ChannelSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChannelSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChannelSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    channel<T extends ChannelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChannelDefaultArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChannelSubscription model
   */
  interface ChannelSubscriptionFieldRefs {
    readonly userId: FieldRef<"ChannelSubscription", 'String'>
    readonly channelId: FieldRef<"ChannelSubscription", 'String'>
    readonly createdAt: FieldRef<"ChannelSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChannelSubscription findUnique
   */
  export type ChannelSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ChannelSubscription to fetch.
     */
    where: ChannelSubscriptionWhereUniqueInput
  }

  /**
   * ChannelSubscription findUniqueOrThrow
   */
  export type ChannelSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ChannelSubscription to fetch.
     */
    where: ChannelSubscriptionWhereUniqueInput
  }

  /**
   * ChannelSubscription findFirst
   */
  export type ChannelSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ChannelSubscription to fetch.
     */
    where?: ChannelSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelSubscriptions to fetch.
     */
    orderBy?: ChannelSubscriptionOrderByWithRelationInput | ChannelSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChannelSubscriptions.
     */
    cursor?: ChannelSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChannelSubscriptions.
     */
    distinct?: ChannelSubscriptionScalarFieldEnum | ChannelSubscriptionScalarFieldEnum[]
  }

  /**
   * ChannelSubscription findFirstOrThrow
   */
  export type ChannelSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ChannelSubscription to fetch.
     */
    where?: ChannelSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelSubscriptions to fetch.
     */
    orderBy?: ChannelSubscriptionOrderByWithRelationInput | ChannelSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChannelSubscriptions.
     */
    cursor?: ChannelSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChannelSubscriptions.
     */
    distinct?: ChannelSubscriptionScalarFieldEnum | ChannelSubscriptionScalarFieldEnum[]
  }

  /**
   * ChannelSubscription findMany
   */
  export type ChannelSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ChannelSubscriptions to fetch.
     */
    where?: ChannelSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelSubscriptions to fetch.
     */
    orderBy?: ChannelSubscriptionOrderByWithRelationInput | ChannelSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChannelSubscriptions.
     */
    cursor?: ChannelSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChannelSubscriptions.
     */
    distinct?: ChannelSubscriptionScalarFieldEnum | ChannelSubscriptionScalarFieldEnum[]
  }

  /**
   * ChannelSubscription create
   */
  export type ChannelSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a ChannelSubscription.
     */
    data: XOR<ChannelSubscriptionCreateInput, ChannelSubscriptionUncheckedCreateInput>
  }

  /**
   * ChannelSubscription createMany
   */
  export type ChannelSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChannelSubscriptions.
     */
    data: ChannelSubscriptionCreateManyInput | ChannelSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChannelSubscription createManyAndReturn
   */
  export type ChannelSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many ChannelSubscriptions.
     */
    data: ChannelSubscriptionCreateManyInput | ChannelSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChannelSubscription update
   */
  export type ChannelSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a ChannelSubscription.
     */
    data: XOR<ChannelSubscriptionUpdateInput, ChannelSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which ChannelSubscription to update.
     */
    where: ChannelSubscriptionWhereUniqueInput
  }

  /**
   * ChannelSubscription updateMany
   */
  export type ChannelSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChannelSubscriptions.
     */
    data: XOR<ChannelSubscriptionUpdateManyMutationInput, ChannelSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which ChannelSubscriptions to update
     */
    where?: ChannelSubscriptionWhereInput
    /**
     * Limit how many ChannelSubscriptions to update.
     */
    limit?: number
  }

  /**
   * ChannelSubscription updateManyAndReturn
   */
  export type ChannelSubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update ChannelSubscriptions.
     */
    data: XOR<ChannelSubscriptionUpdateManyMutationInput, ChannelSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which ChannelSubscriptions to update
     */
    where?: ChannelSubscriptionWhereInput
    /**
     * Limit how many ChannelSubscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChannelSubscription upsert
   */
  export type ChannelSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the ChannelSubscription to update in case it exists.
     */
    where: ChannelSubscriptionWhereUniqueInput
    /**
     * In case the ChannelSubscription found by the `where` argument doesn't exist, create a new ChannelSubscription with this data.
     */
    create: XOR<ChannelSubscriptionCreateInput, ChannelSubscriptionUncheckedCreateInput>
    /**
     * In case the ChannelSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelSubscriptionUpdateInput, ChannelSubscriptionUncheckedUpdateInput>
  }

  /**
   * ChannelSubscription delete
   */
  export type ChannelSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
    /**
     * Filter which ChannelSubscription to delete.
     */
    where: ChannelSubscriptionWhereUniqueInput
  }

  /**
   * ChannelSubscription deleteMany
   */
  export type ChannelSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChannelSubscriptions to delete
     */
    where?: ChannelSubscriptionWhereInput
    /**
     * Limit how many ChannelSubscriptions to delete.
     */
    limit?: number
  }

  /**
   * ChannelSubscription without action
   */
  export type ChannelSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelSubscription
     */
    select?: ChannelSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChannelSubscription
     */
    omit?: ChannelSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelSubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Podcast
   */

  export type AggregatePodcast = {
    _count: PodcastCountAggregateOutputType | null
    _avg: PodcastAvgAggregateOutputType | null
    _sum: PodcastSumAggregateOutputType | null
    _min: PodcastMinAggregateOutputType | null
    _max: PodcastMaxAggregateOutputType | null
  }

  export type PodcastAvgAggregateOutputType = {
    peakViewers: number | null
    totalViews: number | null
  }

  export type PodcastSumAggregateOutputType = {
    peakViewers: number | null
    totalViews: number | null
  }

  export type PodcastMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    thumbnailUrl: string | null
    visibility: $Enums.Visibility | null
    status: $Enums.PodcastStatus | null
    scheduledAt: Date | null
    schedulerJobId: string | null
    startedAt: Date | null
    endedAt: Date | null
    peakViewers: number | null
    totalViews: number | null
    channelId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PodcastMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    thumbnailUrl: string | null
    visibility: $Enums.Visibility | null
    status: $Enums.PodcastStatus | null
    scheduledAt: Date | null
    schedulerJobId: string | null
    startedAt: Date | null
    endedAt: Date | null
    peakViewers: number | null
    totalViews: number | null
    channelId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PodcastCountAggregateOutputType = {
    id: number
    title: number
    description: number
    thumbnailUrl: number
    visibility: number
    status: number
    scheduledAt: number
    schedulerJobId: number
    startedAt: number
    endedAt: number
    peakViewers: number
    totalViews: number
    channelId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type PodcastAvgAggregateInputType = {
    peakViewers?: true
    totalViews?: true
  }

  export type PodcastSumAggregateInputType = {
    peakViewers?: true
    totalViews?: true
  }

  export type PodcastMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnailUrl?: true
    visibility?: true
    status?: true
    scheduledAt?: true
    schedulerJobId?: true
    startedAt?: true
    endedAt?: true
    peakViewers?: true
    totalViews?: true
    channelId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PodcastMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnailUrl?: true
    visibility?: true
    status?: true
    scheduledAt?: true
    schedulerJobId?: true
    startedAt?: true
    endedAt?: true
    peakViewers?: true
    totalViews?: true
    channelId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PodcastCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnailUrl?: true
    visibility?: true
    status?: true
    scheduledAt?: true
    schedulerJobId?: true
    startedAt?: true
    endedAt?: true
    peakViewers?: true
    totalViews?: true
    channelId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type PodcastAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Podcast to aggregate.
     */
    where?: PodcastWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Podcasts to fetch.
     */
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PodcastWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Podcasts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Podcasts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Podcasts
    **/
    _count?: true | PodcastCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PodcastAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PodcastSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PodcastMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PodcastMaxAggregateInputType
  }

  export type GetPodcastAggregateType<T extends PodcastAggregateArgs> = {
        [P in keyof T & keyof AggregatePodcast]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePodcast[P]>
      : GetScalarType<T[P], AggregatePodcast[P]>
  }




  export type PodcastGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PodcastWhereInput
    orderBy?: PodcastOrderByWithAggregationInput | PodcastOrderByWithAggregationInput[]
    by: PodcastScalarFieldEnum[] | PodcastScalarFieldEnum
    having?: PodcastScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PodcastCountAggregateInputType | true
    _avg?: PodcastAvgAggregateInputType
    _sum?: PodcastSumAggregateInputType
    _min?: PodcastMinAggregateInputType
    _max?: PodcastMaxAggregateInputType
  }

  export type PodcastGroupByOutputType = {
    id: string
    title: string
    description: string
    thumbnailUrl: string | null
    visibility: $Enums.Visibility
    status: $Enums.PodcastStatus
    scheduledAt: Date | null
    schedulerJobId: string | null
    startedAt: Date | null
    endedAt: Date | null
    peakViewers: number
    totalViews: number
    channelId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: PodcastCountAggregateOutputType | null
    _avg: PodcastAvgAggregateOutputType | null
    _sum: PodcastSumAggregateOutputType | null
    _min: PodcastMinAggregateOutputType | null
    _max: PodcastMaxAggregateOutputType | null
  }

  type GetPodcastGroupByPayload<T extends PodcastGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PodcastGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PodcastGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PodcastGroupByOutputType[P]>
            : GetScalarType<T[P], PodcastGroupByOutputType[P]>
        }
      >
    >


  export type PodcastSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    visibility?: boolean
    status?: boolean
    scheduledAt?: boolean
    schedulerJobId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    peakViewers?: boolean
    totalViews?: boolean
    channelId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["podcast"]>

  export type PodcastSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    visibility?: boolean
    status?: boolean
    scheduledAt?: boolean
    schedulerJobId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    peakViewers?: boolean
    totalViews?: boolean
    channelId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["podcast"]>

  export type PodcastSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    visibility?: boolean
    status?: boolean
    scheduledAt?: boolean
    schedulerJobId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    peakViewers?: boolean
    totalViews?: boolean
    channelId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["podcast"]>

  export type PodcastSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    visibility?: boolean
    status?: boolean
    scheduledAt?: boolean
    schedulerJobId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    peakViewers?: boolean
    totalViews?: boolean
    channelId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type PodcastOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "thumbnailUrl" | "visibility" | "status" | "scheduledAt" | "schedulerJobId" | "startedAt" | "endedAt" | "peakViewers" | "totalViews" | "channelId" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["podcast"]>
  export type PodcastInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }
  export type PodcastIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }
  export type PodcastIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channel?: boolean | ChannelDefaultArgs<ExtArgs>
  }

  export type $PodcastPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Podcast"
    objects: {
      channel: Prisma.$ChannelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      thumbnailUrl: string | null
      visibility: $Enums.Visibility
      status: $Enums.PodcastStatus
      scheduledAt: Date | null
      schedulerJobId: string | null
      startedAt: Date | null
      endedAt: Date | null
      peakViewers: number
      totalViews: number
      channelId: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["podcast"]>
    composites: {}
  }

  type PodcastGetPayload<S extends boolean | null | undefined | PodcastDefaultArgs> = $Result.GetResult<Prisma.$PodcastPayload, S>

  type PodcastCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PodcastFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PodcastCountAggregateInputType | true
    }

  export interface PodcastDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Podcast'], meta: { name: 'Podcast' } }
    /**
     * Find zero or one Podcast that matches the filter.
     * @param {PodcastFindUniqueArgs} args - Arguments to find a Podcast
     * @example
     * // Get one Podcast
     * const podcast = await prisma.podcast.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PodcastFindUniqueArgs>(args: SelectSubset<T, PodcastFindUniqueArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Podcast that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PodcastFindUniqueOrThrowArgs} args - Arguments to find a Podcast
     * @example
     * // Get one Podcast
     * const podcast = await prisma.podcast.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PodcastFindUniqueOrThrowArgs>(args: SelectSubset<T, PodcastFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Podcast that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastFindFirstArgs} args - Arguments to find a Podcast
     * @example
     * // Get one Podcast
     * const podcast = await prisma.podcast.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PodcastFindFirstArgs>(args?: SelectSubset<T, PodcastFindFirstArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Podcast that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastFindFirstOrThrowArgs} args - Arguments to find a Podcast
     * @example
     * // Get one Podcast
     * const podcast = await prisma.podcast.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PodcastFindFirstOrThrowArgs>(args?: SelectSubset<T, PodcastFindFirstOrThrowArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Podcasts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Podcasts
     * const podcasts = await prisma.podcast.findMany()
     * 
     * // Get first 10 Podcasts
     * const podcasts = await prisma.podcast.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const podcastWithIdOnly = await prisma.podcast.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PodcastFindManyArgs>(args?: SelectSubset<T, PodcastFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Podcast.
     * @param {PodcastCreateArgs} args - Arguments to create a Podcast.
     * @example
     * // Create one Podcast
     * const Podcast = await prisma.podcast.create({
     *   data: {
     *     // ... data to create a Podcast
     *   }
     * })
     * 
     */
    create<T extends PodcastCreateArgs>(args: SelectSubset<T, PodcastCreateArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Podcasts.
     * @param {PodcastCreateManyArgs} args - Arguments to create many Podcasts.
     * @example
     * // Create many Podcasts
     * const podcast = await prisma.podcast.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PodcastCreateManyArgs>(args?: SelectSubset<T, PodcastCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Podcasts and returns the data saved in the database.
     * @param {PodcastCreateManyAndReturnArgs} args - Arguments to create many Podcasts.
     * @example
     * // Create many Podcasts
     * const podcast = await prisma.podcast.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Podcasts and only return the `id`
     * const podcastWithIdOnly = await prisma.podcast.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PodcastCreateManyAndReturnArgs>(args?: SelectSubset<T, PodcastCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Podcast.
     * @param {PodcastDeleteArgs} args - Arguments to delete one Podcast.
     * @example
     * // Delete one Podcast
     * const Podcast = await prisma.podcast.delete({
     *   where: {
     *     // ... filter to delete one Podcast
     *   }
     * })
     * 
     */
    delete<T extends PodcastDeleteArgs>(args: SelectSubset<T, PodcastDeleteArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Podcast.
     * @param {PodcastUpdateArgs} args - Arguments to update one Podcast.
     * @example
     * // Update one Podcast
     * const podcast = await prisma.podcast.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PodcastUpdateArgs>(args: SelectSubset<T, PodcastUpdateArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Podcasts.
     * @param {PodcastDeleteManyArgs} args - Arguments to filter Podcasts to delete.
     * @example
     * // Delete a few Podcasts
     * const { count } = await prisma.podcast.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PodcastDeleteManyArgs>(args?: SelectSubset<T, PodcastDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Podcasts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Podcasts
     * const podcast = await prisma.podcast.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PodcastUpdateManyArgs>(args: SelectSubset<T, PodcastUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Podcasts and returns the data updated in the database.
     * @param {PodcastUpdateManyAndReturnArgs} args - Arguments to update many Podcasts.
     * @example
     * // Update many Podcasts
     * const podcast = await prisma.podcast.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Podcasts and only return the `id`
     * const podcastWithIdOnly = await prisma.podcast.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PodcastUpdateManyAndReturnArgs>(args: SelectSubset<T, PodcastUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Podcast.
     * @param {PodcastUpsertArgs} args - Arguments to update or create a Podcast.
     * @example
     * // Update or create a Podcast
     * const podcast = await prisma.podcast.upsert({
     *   create: {
     *     // ... data to create a Podcast
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Podcast we want to update
     *   }
     * })
     */
    upsert<T extends PodcastUpsertArgs>(args: SelectSubset<T, PodcastUpsertArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Podcasts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastCountArgs} args - Arguments to filter Podcasts to count.
     * @example
     * // Count the number of Podcasts
     * const count = await prisma.podcast.count({
     *   where: {
     *     // ... the filter for the Podcasts we want to count
     *   }
     * })
    **/
    count<T extends PodcastCountArgs>(
      args?: Subset<T, PodcastCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PodcastCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Podcast.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PodcastAggregateArgs>(args: Subset<T, PodcastAggregateArgs>): Prisma.PrismaPromise<GetPodcastAggregateType<T>>

    /**
     * Group by Podcast.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PodcastGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PodcastGroupByArgs['orderBy'] }
        : { orderBy?: PodcastGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PodcastGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPodcastGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Podcast model
   */
  readonly fields: PodcastFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Podcast.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PodcastClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    channel<T extends ChannelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChannelDefaultArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Podcast model
   */
  interface PodcastFieldRefs {
    readonly id: FieldRef<"Podcast", 'String'>
    readonly title: FieldRef<"Podcast", 'String'>
    readonly description: FieldRef<"Podcast", 'String'>
    readonly thumbnailUrl: FieldRef<"Podcast", 'String'>
    readonly visibility: FieldRef<"Podcast", 'Visibility'>
    readonly status: FieldRef<"Podcast", 'PodcastStatus'>
    readonly scheduledAt: FieldRef<"Podcast", 'DateTime'>
    readonly schedulerJobId: FieldRef<"Podcast", 'String'>
    readonly startedAt: FieldRef<"Podcast", 'DateTime'>
    readonly endedAt: FieldRef<"Podcast", 'DateTime'>
    readonly peakViewers: FieldRef<"Podcast", 'Int'>
    readonly totalViews: FieldRef<"Podcast", 'Int'>
    readonly channelId: FieldRef<"Podcast", 'String'>
    readonly createdAt: FieldRef<"Podcast", 'DateTime'>
    readonly updatedAt: FieldRef<"Podcast", 'DateTime'>
    readonly deletedAt: FieldRef<"Podcast", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Podcast findUnique
   */
  export type PodcastFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcast to fetch.
     */
    where: PodcastWhereUniqueInput
  }

  /**
   * Podcast findUniqueOrThrow
   */
  export type PodcastFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcast to fetch.
     */
    where: PodcastWhereUniqueInput
  }

  /**
   * Podcast findFirst
   */
  export type PodcastFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcast to fetch.
     */
    where?: PodcastWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Podcasts to fetch.
     */
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Podcasts.
     */
    cursor?: PodcastWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Podcasts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Podcasts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Podcasts.
     */
    distinct?: PodcastScalarFieldEnum | PodcastScalarFieldEnum[]
  }

  /**
   * Podcast findFirstOrThrow
   */
  export type PodcastFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcast to fetch.
     */
    where?: PodcastWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Podcasts to fetch.
     */
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Podcasts.
     */
    cursor?: PodcastWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Podcasts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Podcasts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Podcasts.
     */
    distinct?: PodcastScalarFieldEnum | PodcastScalarFieldEnum[]
  }

  /**
   * Podcast findMany
   */
  export type PodcastFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcasts to fetch.
     */
    where?: PodcastWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Podcasts to fetch.
     */
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Podcasts.
     */
    cursor?: PodcastWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Podcasts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Podcasts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Podcasts.
     */
    distinct?: PodcastScalarFieldEnum | PodcastScalarFieldEnum[]
  }

  /**
   * Podcast create
   */
  export type PodcastCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * The data needed to create a Podcast.
     */
    data: XOR<PodcastCreateInput, PodcastUncheckedCreateInput>
  }

  /**
   * Podcast createMany
   */
  export type PodcastCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Podcasts.
     */
    data: PodcastCreateManyInput | PodcastCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Podcast createManyAndReturn
   */
  export type PodcastCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * The data used to create many Podcasts.
     */
    data: PodcastCreateManyInput | PodcastCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Podcast update
   */
  export type PodcastUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * The data needed to update a Podcast.
     */
    data: XOR<PodcastUpdateInput, PodcastUncheckedUpdateInput>
    /**
     * Choose, which Podcast to update.
     */
    where: PodcastWhereUniqueInput
  }

  /**
   * Podcast updateMany
   */
  export type PodcastUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Podcasts.
     */
    data: XOR<PodcastUpdateManyMutationInput, PodcastUncheckedUpdateManyInput>
    /**
     * Filter which Podcasts to update
     */
    where?: PodcastWhereInput
    /**
     * Limit how many Podcasts to update.
     */
    limit?: number
  }

  /**
   * Podcast updateManyAndReturn
   */
  export type PodcastUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * The data used to update Podcasts.
     */
    data: XOR<PodcastUpdateManyMutationInput, PodcastUncheckedUpdateManyInput>
    /**
     * Filter which Podcasts to update
     */
    where?: PodcastWhereInput
    /**
     * Limit how many Podcasts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Podcast upsert
   */
  export type PodcastUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * The filter to search for the Podcast to update in case it exists.
     */
    where: PodcastWhereUniqueInput
    /**
     * In case the Podcast found by the `where` argument doesn't exist, create a new Podcast with this data.
     */
    create: XOR<PodcastCreateInput, PodcastUncheckedCreateInput>
    /**
     * In case the Podcast was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PodcastUpdateInput, PodcastUncheckedUpdateInput>
  }

  /**
   * Podcast delete
   */
  export type PodcastDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter which Podcast to delete.
     */
    where: PodcastWhereUniqueInput
  }

  /**
   * Podcast deleteMany
   */
  export type PodcastDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Podcasts to delete
     */
    where?: PodcastWhereInput
    /**
     * Limit how many Podcasts to delete.
     */
    limit?: number
  }

  /**
   * Podcast without action
   */
  export type PodcastDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ChannelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    bannerUrl: 'bannerUrl',
    profilePictureUrl: 'profilePictureUrl',
    subscriberCount: 'subscriberCount',
    podcastCount: 'podcastCount',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type ChannelScalarFieldEnum = (typeof ChannelScalarFieldEnum)[keyof typeof ChannelScalarFieldEnum]


  export const ChannelSubscriptionScalarFieldEnum: {
    userId: 'userId',
    channelId: 'channelId',
    createdAt: 'createdAt'
  };

  export type ChannelSubscriptionScalarFieldEnum = (typeof ChannelSubscriptionScalarFieldEnum)[keyof typeof ChannelSubscriptionScalarFieldEnum]


  export const PodcastScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    thumbnailUrl: 'thumbnailUrl',
    visibility: 'visibility',
    status: 'status',
    scheduledAt: 'scheduledAt',
    schedulerJobId: 'schedulerJobId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    peakViewers: 'peakViewers',
    totalViews: 'totalViews',
    channelId: 'channelId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type PodcastScalarFieldEnum = (typeof PodcastScalarFieldEnum)[keyof typeof PodcastScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Visibility'
   */
  export type EnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility'>
    


  /**
   * Reference to a field of type 'Visibility[]'
   */
  export type ListEnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility[]'>
    


  /**
   * Reference to a field of type 'PodcastStatus'
   */
  export type EnumPodcastStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PodcastStatus'>
    


  /**
   * Reference to a field of type 'PodcastStatus[]'
   */
  export type ListEnumPodcastStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PodcastStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ChannelWhereInput = {
    AND?: ChannelWhereInput | ChannelWhereInput[]
    OR?: ChannelWhereInput[]
    NOT?: ChannelWhereInput | ChannelWhereInput[]
    id?: StringFilter<"Channel"> | string
    name?: StringFilter<"Channel"> | string
    slug?: StringFilter<"Channel"> | string
    description?: StringFilter<"Channel"> | string
    bannerUrl?: StringNullableFilter<"Channel"> | string | null
    profilePictureUrl?: StringNullableFilter<"Channel"> | string | null
    subscriberCount?: IntFilter<"Channel"> | number
    podcastCount?: IntFilter<"Channel"> | number
    ownerId?: StringFilter<"Channel"> | string
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    updatedAt?: DateTimeFilter<"Channel"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Channel"> | Date | string | null
    podcasts?: PodcastListRelationFilter
    subscriptions?: ChannelSubscriptionListRelationFilter
  }

  export type ChannelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    bannerUrl?: SortOrderInput | SortOrder
    profilePictureUrl?: SortOrderInput | SortOrder
    subscriberCount?: SortOrder
    podcastCount?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    podcasts?: PodcastOrderByRelationAggregateInput
    subscriptions?: ChannelSubscriptionOrderByRelationAggregateInput
  }

  export type ChannelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ChannelWhereInput | ChannelWhereInput[]
    OR?: ChannelWhereInput[]
    NOT?: ChannelWhereInput | ChannelWhereInput[]
    name?: StringFilter<"Channel"> | string
    description?: StringFilter<"Channel"> | string
    bannerUrl?: StringNullableFilter<"Channel"> | string | null
    profilePictureUrl?: StringNullableFilter<"Channel"> | string | null
    subscriberCount?: IntFilter<"Channel"> | number
    podcastCount?: IntFilter<"Channel"> | number
    ownerId?: StringFilter<"Channel"> | string
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    updatedAt?: DateTimeFilter<"Channel"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Channel"> | Date | string | null
    podcasts?: PodcastListRelationFilter
    subscriptions?: ChannelSubscriptionListRelationFilter
  }, "id" | "slug">

  export type ChannelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    bannerUrl?: SortOrderInput | SortOrder
    profilePictureUrl?: SortOrderInput | SortOrder
    subscriberCount?: SortOrder
    podcastCount?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ChannelCountOrderByAggregateInput
    _avg?: ChannelAvgOrderByAggregateInput
    _max?: ChannelMaxOrderByAggregateInput
    _min?: ChannelMinOrderByAggregateInput
    _sum?: ChannelSumOrderByAggregateInput
  }

  export type ChannelScalarWhereWithAggregatesInput = {
    AND?: ChannelScalarWhereWithAggregatesInput | ChannelScalarWhereWithAggregatesInput[]
    OR?: ChannelScalarWhereWithAggregatesInput[]
    NOT?: ChannelScalarWhereWithAggregatesInput | ChannelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Channel"> | string
    name?: StringWithAggregatesFilter<"Channel"> | string
    slug?: StringWithAggregatesFilter<"Channel"> | string
    description?: StringWithAggregatesFilter<"Channel"> | string
    bannerUrl?: StringNullableWithAggregatesFilter<"Channel"> | string | null
    profilePictureUrl?: StringNullableWithAggregatesFilter<"Channel"> | string | null
    subscriberCount?: IntWithAggregatesFilter<"Channel"> | number
    podcastCount?: IntWithAggregatesFilter<"Channel"> | number
    ownerId?: StringWithAggregatesFilter<"Channel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Channel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Channel"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Channel"> | Date | string | null
  }

  export type ChannelSubscriptionWhereInput = {
    AND?: ChannelSubscriptionWhereInput | ChannelSubscriptionWhereInput[]
    OR?: ChannelSubscriptionWhereInput[]
    NOT?: ChannelSubscriptionWhereInput | ChannelSubscriptionWhereInput[]
    userId?: StringFilter<"ChannelSubscription"> | string
    channelId?: StringFilter<"ChannelSubscription"> | string
    createdAt?: DateTimeFilter<"ChannelSubscription"> | Date | string
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
  }

  export type ChannelSubscriptionOrderByWithRelationInput = {
    userId?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
    channel?: ChannelOrderByWithRelationInput
  }

  export type ChannelSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    userId_channelId?: ChannelSubscriptionUserIdChannelIdCompoundUniqueInput
    AND?: ChannelSubscriptionWhereInput | ChannelSubscriptionWhereInput[]
    OR?: ChannelSubscriptionWhereInput[]
    NOT?: ChannelSubscriptionWhereInput | ChannelSubscriptionWhereInput[]
    userId?: StringFilter<"ChannelSubscription"> | string
    channelId?: StringFilter<"ChannelSubscription"> | string
    createdAt?: DateTimeFilter<"ChannelSubscription"> | Date | string
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
  }, "userId_channelId">

  export type ChannelSubscriptionOrderByWithAggregationInput = {
    userId?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
    _count?: ChannelSubscriptionCountOrderByAggregateInput
    _max?: ChannelSubscriptionMaxOrderByAggregateInput
    _min?: ChannelSubscriptionMinOrderByAggregateInput
  }

  export type ChannelSubscriptionScalarWhereWithAggregatesInput = {
    AND?: ChannelSubscriptionScalarWhereWithAggregatesInput | ChannelSubscriptionScalarWhereWithAggregatesInput[]
    OR?: ChannelSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: ChannelSubscriptionScalarWhereWithAggregatesInput | ChannelSubscriptionScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"ChannelSubscription"> | string
    channelId?: StringWithAggregatesFilter<"ChannelSubscription"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ChannelSubscription"> | Date | string
  }

  export type PodcastWhereInput = {
    AND?: PodcastWhereInput | PodcastWhereInput[]
    OR?: PodcastWhereInput[]
    NOT?: PodcastWhereInput | PodcastWhereInput[]
    id?: StringFilter<"Podcast"> | string
    title?: StringFilter<"Podcast"> | string
    description?: StringFilter<"Podcast"> | string
    thumbnailUrl?: StringNullableFilter<"Podcast"> | string | null
    visibility?: EnumVisibilityFilter<"Podcast"> | $Enums.Visibility
    status?: EnumPodcastStatusFilter<"Podcast"> | $Enums.PodcastStatus
    scheduledAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    schedulerJobId?: StringNullableFilter<"Podcast"> | string | null
    startedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    peakViewers?: IntFilter<"Podcast"> | number
    totalViews?: IntFilter<"Podcast"> | number
    channelId?: StringFilter<"Podcast"> | string
    createdAt?: DateTimeFilter<"Podcast"> | Date | string
    updatedAt?: DateTimeFilter<"Podcast"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
  }

  export type PodcastOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    visibility?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    schedulerJobId?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    peakViewers?: SortOrder
    totalViews?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    channel?: ChannelOrderByWithRelationInput
  }

  export type PodcastWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PodcastWhereInput | PodcastWhereInput[]
    OR?: PodcastWhereInput[]
    NOT?: PodcastWhereInput | PodcastWhereInput[]
    title?: StringFilter<"Podcast"> | string
    description?: StringFilter<"Podcast"> | string
    thumbnailUrl?: StringNullableFilter<"Podcast"> | string | null
    visibility?: EnumVisibilityFilter<"Podcast"> | $Enums.Visibility
    status?: EnumPodcastStatusFilter<"Podcast"> | $Enums.PodcastStatus
    scheduledAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    schedulerJobId?: StringNullableFilter<"Podcast"> | string | null
    startedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    peakViewers?: IntFilter<"Podcast"> | number
    totalViews?: IntFilter<"Podcast"> | number
    channelId?: StringFilter<"Podcast"> | string
    createdAt?: DateTimeFilter<"Podcast"> | Date | string
    updatedAt?: DateTimeFilter<"Podcast"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    channel?: XOR<ChannelScalarRelationFilter, ChannelWhereInput>
  }, "id">

  export type PodcastOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    visibility?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    schedulerJobId?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    peakViewers?: SortOrder
    totalViews?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: PodcastCountOrderByAggregateInput
    _avg?: PodcastAvgOrderByAggregateInput
    _max?: PodcastMaxOrderByAggregateInput
    _min?: PodcastMinOrderByAggregateInput
    _sum?: PodcastSumOrderByAggregateInput
  }

  export type PodcastScalarWhereWithAggregatesInput = {
    AND?: PodcastScalarWhereWithAggregatesInput | PodcastScalarWhereWithAggregatesInput[]
    OR?: PodcastScalarWhereWithAggregatesInput[]
    NOT?: PodcastScalarWhereWithAggregatesInput | PodcastScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Podcast"> | string
    title?: StringWithAggregatesFilter<"Podcast"> | string
    description?: StringWithAggregatesFilter<"Podcast"> | string
    thumbnailUrl?: StringNullableWithAggregatesFilter<"Podcast"> | string | null
    visibility?: EnumVisibilityWithAggregatesFilter<"Podcast"> | $Enums.Visibility
    status?: EnumPodcastStatusWithAggregatesFilter<"Podcast"> | $Enums.PodcastStatus
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"Podcast"> | Date | string | null
    schedulerJobId?: StringNullableWithAggregatesFilter<"Podcast"> | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"Podcast"> | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter<"Podcast"> | Date | string | null
    peakViewers?: IntWithAggregatesFilter<"Podcast"> | number
    totalViews?: IntWithAggregatesFilter<"Podcast"> | number
    channelId?: StringWithAggregatesFilter<"Podcast"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Podcast"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Podcast"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Podcast"> | Date | string | null
  }

  export type ChannelCreateInput = {
    id?: string
    name: string
    slug: string
    description: string
    bannerUrl?: string | null
    profilePictureUrl?: string | null
    subscriberCount?: number
    podcastCount?: number
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    podcasts?: PodcastCreateNestedManyWithoutChannelInput
    subscriptions?: ChannelSubscriptionCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description: string
    bannerUrl?: string | null
    profilePictureUrl?: string | null
    subscriberCount?: number
    podcastCount?: number
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    podcasts?: PodcastUncheckedCreateNestedManyWithoutChannelInput
    subscriptions?: ChannelSubscriptionUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberCount?: IntFieldUpdateOperationsInput | number
    podcastCount?: IntFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    podcasts?: PodcastUpdateManyWithoutChannelNestedInput
    subscriptions?: ChannelSubscriptionUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberCount?: IntFieldUpdateOperationsInput | number
    podcastCount?: IntFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    podcasts?: PodcastUncheckedUpdateManyWithoutChannelNestedInput
    subscriptions?: ChannelSubscriptionUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type ChannelCreateManyInput = {
    id?: string
    name: string
    slug: string
    description: string
    bannerUrl?: string | null
    profilePictureUrl?: string | null
    subscriberCount?: number
    podcastCount?: number
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ChannelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberCount?: IntFieldUpdateOperationsInput | number
    podcastCount?: IntFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChannelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberCount?: IntFieldUpdateOperationsInput | number
    podcastCount?: IntFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChannelSubscriptionCreateInput = {
    userId: string
    createdAt?: Date | string
    channel: ChannelCreateNestedOneWithoutSubscriptionsInput
  }

  export type ChannelSubscriptionUncheckedCreateInput = {
    userId: string
    channelId: string
    createdAt?: Date | string
  }

  export type ChannelSubscriptionUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: ChannelUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type ChannelSubscriptionUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelSubscriptionCreateManyInput = {
    userId: string
    channelId: string
    createdAt?: Date | string
  }

  export type ChannelSubscriptionUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelSubscriptionUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PodcastCreateInput = {
    id?: string
    title: string
    description: string
    thumbnailUrl?: string | null
    visibility?: $Enums.Visibility
    status?: $Enums.PodcastStatus
    scheduledAt?: Date | string | null
    schedulerJobId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    peakViewers?: number
    totalViews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    channel: ChannelCreateNestedOneWithoutPodcastsInput
  }

  export type PodcastUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    thumbnailUrl?: string | null
    visibility?: $Enums.Visibility
    status?: $Enums.PodcastStatus
    scheduledAt?: Date | string | null
    schedulerJobId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    peakViewers?: number
    totalViews?: number
    channelId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PodcastUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    status?: EnumPodcastStatusFieldUpdateOperationsInput | $Enums.PodcastStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedulerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    peakViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    channel?: ChannelUpdateOneRequiredWithoutPodcastsNestedInput
  }

  export type PodcastUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    status?: EnumPodcastStatusFieldUpdateOperationsInput | $Enums.PodcastStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedulerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    peakViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    channelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PodcastCreateManyInput = {
    id?: string
    title: string
    description: string
    thumbnailUrl?: string | null
    visibility?: $Enums.Visibility
    status?: $Enums.PodcastStatus
    scheduledAt?: Date | string | null
    schedulerJobId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    peakViewers?: number
    totalViews?: number
    channelId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PodcastUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    status?: EnumPodcastStatusFieldUpdateOperationsInput | $Enums.PodcastStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedulerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    peakViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PodcastUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    status?: EnumPodcastStatusFieldUpdateOperationsInput | $Enums.PodcastStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedulerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    peakViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    channelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PodcastListRelationFilter = {
    every?: PodcastWhereInput
    some?: PodcastWhereInput
    none?: PodcastWhereInput
  }

  export type ChannelSubscriptionListRelationFilter = {
    every?: ChannelSubscriptionWhereInput
    some?: ChannelSubscriptionWhereInput
    none?: ChannelSubscriptionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PodcastOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChannelSubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChannelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    bannerUrl?: SortOrder
    profilePictureUrl?: SortOrder
    subscriberCount?: SortOrder
    podcastCount?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ChannelAvgOrderByAggregateInput = {
    subscriberCount?: SortOrder
    podcastCount?: SortOrder
  }

  export type ChannelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    bannerUrl?: SortOrder
    profilePictureUrl?: SortOrder
    subscriberCount?: SortOrder
    podcastCount?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ChannelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    bannerUrl?: SortOrder
    profilePictureUrl?: SortOrder
    subscriberCount?: SortOrder
    podcastCount?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ChannelSumOrderByAggregateInput = {
    subscriberCount?: SortOrder
    podcastCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ChannelScalarRelationFilter = {
    is?: ChannelWhereInput
    isNot?: ChannelWhereInput
  }

  export type ChannelSubscriptionUserIdChannelIdCompoundUniqueInput = {
    userId: string
    channelId: string
  }

  export type ChannelSubscriptionCountOrderByAggregateInput = {
    userId?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
  }

  export type ChannelSubscriptionMaxOrderByAggregateInput = {
    userId?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
  }

  export type ChannelSubscriptionMinOrderByAggregateInput = {
    userId?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type EnumPodcastStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PodcastStatus | EnumPodcastStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PodcastStatus[] | ListEnumPodcastStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PodcastStatus[] | ListEnumPodcastStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPodcastStatusFilter<$PrismaModel> | $Enums.PodcastStatus
  }

  export type PodcastCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    visibility?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    schedulerJobId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    peakViewers?: SortOrder
    totalViews?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PodcastAvgOrderByAggregateInput = {
    peakViewers?: SortOrder
    totalViews?: SortOrder
  }

  export type PodcastMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    visibility?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    schedulerJobId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    peakViewers?: SortOrder
    totalViews?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PodcastMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    visibility?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    schedulerJobId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    peakViewers?: SortOrder
    totalViews?: SortOrder
    channelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PodcastSumOrderByAggregateInput = {
    peakViewers?: SortOrder
    totalViews?: SortOrder
  }

  export type EnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type EnumPodcastStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PodcastStatus | EnumPodcastStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PodcastStatus[] | ListEnumPodcastStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PodcastStatus[] | ListEnumPodcastStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPodcastStatusWithAggregatesFilter<$PrismaModel> | $Enums.PodcastStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPodcastStatusFilter<$PrismaModel>
    _max?: NestedEnumPodcastStatusFilter<$PrismaModel>
  }

  export type PodcastCreateNestedManyWithoutChannelInput = {
    create?: XOR<PodcastCreateWithoutChannelInput, PodcastUncheckedCreateWithoutChannelInput> | PodcastCreateWithoutChannelInput[] | PodcastUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: PodcastCreateOrConnectWithoutChannelInput | PodcastCreateOrConnectWithoutChannelInput[]
    createMany?: PodcastCreateManyChannelInputEnvelope
    connect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
  }

  export type ChannelSubscriptionCreateNestedManyWithoutChannelInput = {
    create?: XOR<ChannelSubscriptionCreateWithoutChannelInput, ChannelSubscriptionUncheckedCreateWithoutChannelInput> | ChannelSubscriptionCreateWithoutChannelInput[] | ChannelSubscriptionUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: ChannelSubscriptionCreateOrConnectWithoutChannelInput | ChannelSubscriptionCreateOrConnectWithoutChannelInput[]
    createMany?: ChannelSubscriptionCreateManyChannelInputEnvelope
    connect?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
  }

  export type PodcastUncheckedCreateNestedManyWithoutChannelInput = {
    create?: XOR<PodcastCreateWithoutChannelInput, PodcastUncheckedCreateWithoutChannelInput> | PodcastCreateWithoutChannelInput[] | PodcastUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: PodcastCreateOrConnectWithoutChannelInput | PodcastCreateOrConnectWithoutChannelInput[]
    createMany?: PodcastCreateManyChannelInputEnvelope
    connect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
  }

  export type ChannelSubscriptionUncheckedCreateNestedManyWithoutChannelInput = {
    create?: XOR<ChannelSubscriptionCreateWithoutChannelInput, ChannelSubscriptionUncheckedCreateWithoutChannelInput> | ChannelSubscriptionCreateWithoutChannelInput[] | ChannelSubscriptionUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: ChannelSubscriptionCreateOrConnectWithoutChannelInput | ChannelSubscriptionCreateOrConnectWithoutChannelInput[]
    createMany?: ChannelSubscriptionCreateManyChannelInputEnvelope
    connect?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PodcastUpdateManyWithoutChannelNestedInput = {
    create?: XOR<PodcastCreateWithoutChannelInput, PodcastUncheckedCreateWithoutChannelInput> | PodcastCreateWithoutChannelInput[] | PodcastUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: PodcastCreateOrConnectWithoutChannelInput | PodcastCreateOrConnectWithoutChannelInput[]
    upsert?: PodcastUpsertWithWhereUniqueWithoutChannelInput | PodcastUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: PodcastCreateManyChannelInputEnvelope
    set?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    disconnect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    delete?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    connect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    update?: PodcastUpdateWithWhereUniqueWithoutChannelInput | PodcastUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: PodcastUpdateManyWithWhereWithoutChannelInput | PodcastUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: PodcastScalarWhereInput | PodcastScalarWhereInput[]
  }

  export type ChannelSubscriptionUpdateManyWithoutChannelNestedInput = {
    create?: XOR<ChannelSubscriptionCreateWithoutChannelInput, ChannelSubscriptionUncheckedCreateWithoutChannelInput> | ChannelSubscriptionCreateWithoutChannelInput[] | ChannelSubscriptionUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: ChannelSubscriptionCreateOrConnectWithoutChannelInput | ChannelSubscriptionCreateOrConnectWithoutChannelInput[]
    upsert?: ChannelSubscriptionUpsertWithWhereUniqueWithoutChannelInput | ChannelSubscriptionUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: ChannelSubscriptionCreateManyChannelInputEnvelope
    set?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
    disconnect?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
    delete?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
    connect?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
    update?: ChannelSubscriptionUpdateWithWhereUniqueWithoutChannelInput | ChannelSubscriptionUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: ChannelSubscriptionUpdateManyWithWhereWithoutChannelInput | ChannelSubscriptionUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: ChannelSubscriptionScalarWhereInput | ChannelSubscriptionScalarWhereInput[]
  }

  export type PodcastUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: XOR<PodcastCreateWithoutChannelInput, PodcastUncheckedCreateWithoutChannelInput> | PodcastCreateWithoutChannelInput[] | PodcastUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: PodcastCreateOrConnectWithoutChannelInput | PodcastCreateOrConnectWithoutChannelInput[]
    upsert?: PodcastUpsertWithWhereUniqueWithoutChannelInput | PodcastUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: PodcastCreateManyChannelInputEnvelope
    set?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    disconnect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    delete?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    connect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    update?: PodcastUpdateWithWhereUniqueWithoutChannelInput | PodcastUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: PodcastUpdateManyWithWhereWithoutChannelInput | PodcastUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: PodcastScalarWhereInput | PodcastScalarWhereInput[]
  }

  export type ChannelSubscriptionUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: XOR<ChannelSubscriptionCreateWithoutChannelInput, ChannelSubscriptionUncheckedCreateWithoutChannelInput> | ChannelSubscriptionCreateWithoutChannelInput[] | ChannelSubscriptionUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: ChannelSubscriptionCreateOrConnectWithoutChannelInput | ChannelSubscriptionCreateOrConnectWithoutChannelInput[]
    upsert?: ChannelSubscriptionUpsertWithWhereUniqueWithoutChannelInput | ChannelSubscriptionUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: ChannelSubscriptionCreateManyChannelInputEnvelope
    set?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
    disconnect?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
    delete?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
    connect?: ChannelSubscriptionWhereUniqueInput | ChannelSubscriptionWhereUniqueInput[]
    update?: ChannelSubscriptionUpdateWithWhereUniqueWithoutChannelInput | ChannelSubscriptionUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: ChannelSubscriptionUpdateManyWithWhereWithoutChannelInput | ChannelSubscriptionUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: ChannelSubscriptionScalarWhereInput | ChannelSubscriptionScalarWhereInput[]
  }

  export type ChannelCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<ChannelCreateWithoutSubscriptionsInput, ChannelUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutSubscriptionsInput
    connect?: ChannelWhereUniqueInput
  }

  export type ChannelUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<ChannelCreateWithoutSubscriptionsInput, ChannelUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutSubscriptionsInput
    upsert?: ChannelUpsertWithoutSubscriptionsInput
    connect?: ChannelWhereUniqueInput
    update?: XOR<XOR<ChannelUpdateToOneWithWhereWithoutSubscriptionsInput, ChannelUpdateWithoutSubscriptionsInput>, ChannelUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type ChannelCreateNestedOneWithoutPodcastsInput = {
    create?: XOR<ChannelCreateWithoutPodcastsInput, ChannelUncheckedCreateWithoutPodcastsInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutPodcastsInput
    connect?: ChannelWhereUniqueInput
  }

  export type EnumVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.Visibility
  }

  export type EnumPodcastStatusFieldUpdateOperationsInput = {
    set?: $Enums.PodcastStatus
  }

  export type ChannelUpdateOneRequiredWithoutPodcastsNestedInput = {
    create?: XOR<ChannelCreateWithoutPodcastsInput, ChannelUncheckedCreateWithoutPodcastsInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutPodcastsInput
    upsert?: ChannelUpsertWithoutPodcastsInput
    connect?: ChannelWhereUniqueInput
    update?: XOR<XOR<ChannelUpdateToOneWithWhereWithoutPodcastsInput, ChannelUpdateWithoutPodcastsInput>, ChannelUncheckedUpdateWithoutPodcastsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type NestedEnumPodcastStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PodcastStatus | EnumPodcastStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PodcastStatus[] | ListEnumPodcastStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PodcastStatus[] | ListEnumPodcastStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPodcastStatusFilter<$PrismaModel> | $Enums.PodcastStatus
  }

  export type NestedEnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type NestedEnumPodcastStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PodcastStatus | EnumPodcastStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PodcastStatus[] | ListEnumPodcastStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PodcastStatus[] | ListEnumPodcastStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPodcastStatusWithAggregatesFilter<$PrismaModel> | $Enums.PodcastStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPodcastStatusFilter<$PrismaModel>
    _max?: NestedEnumPodcastStatusFilter<$PrismaModel>
  }

  export type PodcastCreateWithoutChannelInput = {
    id?: string
    title: string
    description: string
    thumbnailUrl?: string | null
    visibility?: $Enums.Visibility
    status?: $Enums.PodcastStatus
    scheduledAt?: Date | string | null
    schedulerJobId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    peakViewers?: number
    totalViews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PodcastUncheckedCreateWithoutChannelInput = {
    id?: string
    title: string
    description: string
    thumbnailUrl?: string | null
    visibility?: $Enums.Visibility
    status?: $Enums.PodcastStatus
    scheduledAt?: Date | string | null
    schedulerJobId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    peakViewers?: number
    totalViews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PodcastCreateOrConnectWithoutChannelInput = {
    where: PodcastWhereUniqueInput
    create: XOR<PodcastCreateWithoutChannelInput, PodcastUncheckedCreateWithoutChannelInput>
  }

  export type PodcastCreateManyChannelInputEnvelope = {
    data: PodcastCreateManyChannelInput | PodcastCreateManyChannelInput[]
    skipDuplicates?: boolean
  }

  export type ChannelSubscriptionCreateWithoutChannelInput = {
    userId: string
    createdAt?: Date | string
  }

  export type ChannelSubscriptionUncheckedCreateWithoutChannelInput = {
    userId: string
    createdAt?: Date | string
  }

  export type ChannelSubscriptionCreateOrConnectWithoutChannelInput = {
    where: ChannelSubscriptionWhereUniqueInput
    create: XOR<ChannelSubscriptionCreateWithoutChannelInput, ChannelSubscriptionUncheckedCreateWithoutChannelInput>
  }

  export type ChannelSubscriptionCreateManyChannelInputEnvelope = {
    data: ChannelSubscriptionCreateManyChannelInput | ChannelSubscriptionCreateManyChannelInput[]
    skipDuplicates?: boolean
  }

  export type PodcastUpsertWithWhereUniqueWithoutChannelInput = {
    where: PodcastWhereUniqueInput
    update: XOR<PodcastUpdateWithoutChannelInput, PodcastUncheckedUpdateWithoutChannelInput>
    create: XOR<PodcastCreateWithoutChannelInput, PodcastUncheckedCreateWithoutChannelInput>
  }

  export type PodcastUpdateWithWhereUniqueWithoutChannelInput = {
    where: PodcastWhereUniqueInput
    data: XOR<PodcastUpdateWithoutChannelInput, PodcastUncheckedUpdateWithoutChannelInput>
  }

  export type PodcastUpdateManyWithWhereWithoutChannelInput = {
    where: PodcastScalarWhereInput
    data: XOR<PodcastUpdateManyMutationInput, PodcastUncheckedUpdateManyWithoutChannelInput>
  }

  export type PodcastScalarWhereInput = {
    AND?: PodcastScalarWhereInput | PodcastScalarWhereInput[]
    OR?: PodcastScalarWhereInput[]
    NOT?: PodcastScalarWhereInput | PodcastScalarWhereInput[]
    id?: StringFilter<"Podcast"> | string
    title?: StringFilter<"Podcast"> | string
    description?: StringFilter<"Podcast"> | string
    thumbnailUrl?: StringNullableFilter<"Podcast"> | string | null
    visibility?: EnumVisibilityFilter<"Podcast"> | $Enums.Visibility
    status?: EnumPodcastStatusFilter<"Podcast"> | $Enums.PodcastStatus
    scheduledAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    schedulerJobId?: StringNullableFilter<"Podcast"> | string | null
    startedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
    peakViewers?: IntFilter<"Podcast"> | number
    totalViews?: IntFilter<"Podcast"> | number
    channelId?: StringFilter<"Podcast"> | string
    createdAt?: DateTimeFilter<"Podcast"> | Date | string
    updatedAt?: DateTimeFilter<"Podcast"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Podcast"> | Date | string | null
  }

  export type ChannelSubscriptionUpsertWithWhereUniqueWithoutChannelInput = {
    where: ChannelSubscriptionWhereUniqueInput
    update: XOR<ChannelSubscriptionUpdateWithoutChannelInput, ChannelSubscriptionUncheckedUpdateWithoutChannelInput>
    create: XOR<ChannelSubscriptionCreateWithoutChannelInput, ChannelSubscriptionUncheckedCreateWithoutChannelInput>
  }

  export type ChannelSubscriptionUpdateWithWhereUniqueWithoutChannelInput = {
    where: ChannelSubscriptionWhereUniqueInput
    data: XOR<ChannelSubscriptionUpdateWithoutChannelInput, ChannelSubscriptionUncheckedUpdateWithoutChannelInput>
  }

  export type ChannelSubscriptionUpdateManyWithWhereWithoutChannelInput = {
    where: ChannelSubscriptionScalarWhereInput
    data: XOR<ChannelSubscriptionUpdateManyMutationInput, ChannelSubscriptionUncheckedUpdateManyWithoutChannelInput>
  }

  export type ChannelSubscriptionScalarWhereInput = {
    AND?: ChannelSubscriptionScalarWhereInput | ChannelSubscriptionScalarWhereInput[]
    OR?: ChannelSubscriptionScalarWhereInput[]
    NOT?: ChannelSubscriptionScalarWhereInput | ChannelSubscriptionScalarWhereInput[]
    userId?: StringFilter<"ChannelSubscription"> | string
    channelId?: StringFilter<"ChannelSubscription"> | string
    createdAt?: DateTimeFilter<"ChannelSubscription"> | Date | string
  }

  export type ChannelCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    slug: string
    description: string
    bannerUrl?: string | null
    profilePictureUrl?: string | null
    subscriberCount?: number
    podcastCount?: number
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    podcasts?: PodcastCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    slug: string
    description: string
    bannerUrl?: string | null
    profilePictureUrl?: string | null
    subscriberCount?: number
    podcastCount?: number
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    podcasts?: PodcastUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelCreateOrConnectWithoutSubscriptionsInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutSubscriptionsInput, ChannelUncheckedCreateWithoutSubscriptionsInput>
  }

  export type ChannelUpsertWithoutSubscriptionsInput = {
    update: XOR<ChannelUpdateWithoutSubscriptionsInput, ChannelUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<ChannelCreateWithoutSubscriptionsInput, ChannelUncheckedCreateWithoutSubscriptionsInput>
    where?: ChannelWhereInput
  }

  export type ChannelUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: ChannelWhereInput
    data: XOR<ChannelUpdateWithoutSubscriptionsInput, ChannelUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type ChannelUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberCount?: IntFieldUpdateOperationsInput | number
    podcastCount?: IntFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    podcasts?: PodcastUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberCount?: IntFieldUpdateOperationsInput | number
    podcastCount?: IntFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    podcasts?: PodcastUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type ChannelCreateWithoutPodcastsInput = {
    id?: string
    name: string
    slug: string
    description: string
    bannerUrl?: string | null
    profilePictureUrl?: string | null
    subscriberCount?: number
    podcastCount?: number
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    subscriptions?: ChannelSubscriptionCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateWithoutPodcastsInput = {
    id?: string
    name: string
    slug: string
    description: string
    bannerUrl?: string | null
    profilePictureUrl?: string | null
    subscriberCount?: number
    podcastCount?: number
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    subscriptions?: ChannelSubscriptionUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelCreateOrConnectWithoutPodcastsInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutPodcastsInput, ChannelUncheckedCreateWithoutPodcastsInput>
  }

  export type ChannelUpsertWithoutPodcastsInput = {
    update: XOR<ChannelUpdateWithoutPodcastsInput, ChannelUncheckedUpdateWithoutPodcastsInput>
    create: XOR<ChannelCreateWithoutPodcastsInput, ChannelUncheckedCreateWithoutPodcastsInput>
    where?: ChannelWhereInput
  }

  export type ChannelUpdateToOneWithWhereWithoutPodcastsInput = {
    where?: ChannelWhereInput
    data: XOR<ChannelUpdateWithoutPodcastsInput, ChannelUncheckedUpdateWithoutPodcastsInput>
  }

  export type ChannelUpdateWithoutPodcastsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberCount?: IntFieldUpdateOperationsInput | number
    podcastCount?: IntFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: ChannelSubscriptionUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateWithoutPodcastsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberCount?: IntFieldUpdateOperationsInput | number
    podcastCount?: IntFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: ChannelSubscriptionUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type PodcastCreateManyChannelInput = {
    id?: string
    title: string
    description: string
    thumbnailUrl?: string | null
    visibility?: $Enums.Visibility
    status?: $Enums.PodcastStatus
    scheduledAt?: Date | string | null
    schedulerJobId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    peakViewers?: number
    totalViews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ChannelSubscriptionCreateManyChannelInput = {
    userId: string
    createdAt?: Date | string
  }

  export type PodcastUpdateWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    status?: EnumPodcastStatusFieldUpdateOperationsInput | $Enums.PodcastStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedulerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    peakViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PodcastUncheckedUpdateWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    status?: EnumPodcastStatusFieldUpdateOperationsInput | $Enums.PodcastStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedulerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    peakViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PodcastUncheckedUpdateManyWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    status?: EnumPodcastStatusFieldUpdateOperationsInput | $Enums.PodcastStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedulerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    peakViewers?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChannelSubscriptionUpdateWithoutChannelInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelSubscriptionUncheckedUpdateWithoutChannelInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelSubscriptionUncheckedUpdateManyWithoutChannelInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}