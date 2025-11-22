# backend/services/supabase_service.py

from supabase import create_client, Client
from typing import Any, Dict
import os


class SupabaseService:
    def __init__(self):
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # backend should use service role key

        if not url or not key:
            raise ValueError("Supabase environment variables are missing!")

        self.client: Client = create_client(url, key)

    # -----------------------------
    # Example: Insert a record
    # -----------------------------
    def insert(self, table: str, data: Dict[str, Any]):
        try:
            return self.client.table(table).insert(data).execute()
        except Exception as e:
            print("Supabase Insert Error:", e)
            raise e

    # -----------------------------
    # Example: Fetch records
    # -----------------------------
    def fetch(self, table: str, filters: Dict[str, Any] = {}):
        try:
            query = self.client.table(table).select("*")
            for key, value in filters.items():
                query = query.eq(key, value)
            return query.execute()
        except Exception as e:
            print("Supabase Fetch Error:", e)
            raise e

    # -----------------------------
    # Example: Update a record
    # -----------------------------
    def update(self, table: str, match: Dict[str, Any], values: Dict[str, Any]):
        try:
            return self.client.table(table).update(values).match(match).execute()
        except Exception as e:
            print("Supabase Update Error:", e)
            raise e

    # -----------------------------
    # Example: Delete a record
    # -----------------------------
    def delete(self, table: str, match: Dict[str, Any]):
        try:
            return self.client.table(table).delete().match(match).execute()
        except Exception as e:
            print("Supabase Delete Error:", e)
            raise e
