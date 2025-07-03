import {pgTable,serial,text,timestamp,integer} from 'drizzle-orm/pg-core'

export const favouriteTable=pgTable("favorites",{
    id: serial(id).primaryKey(),

})