from pydantic import BaseModel, Field
from user.utils import PyObjectId
from typing import Any


class DbOtrhodoxDrugs(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="orthodox_pk"
    )
    drugbank_id: Any
    name: Any
    description: Any
    cas_number: Any
    state: Any
    groups: Any
    general_references: Any
    synthesis_reference: Any
    indication: Any
    pharmacodynamics: Any
    mechanism_of_action: Any
    toxicity: Any
    metabolism: Any
    absorption: Any
    half_life: Any
    protein_binding: Any
    route_of_elimination: Any
    volume_of_distribution: Any
    clearance: Any
    classification: Any
    salts: Any
    synonyms: Any
    products: Any
    international_brands: Any
    mixtures: Any
    packages: Any
    manufacturers: Any
    prices: Any
    categories: Any
    affected_organisms: Any
    dosages: Any
    atc_codes: Any
    ahfs_codes: Any
    pdb_entries: Any
    patents: Any
    food_interactions: Any
    drug_interactions: Any
    sequences: Any
    experimental_properties: Any
    external_identifiers: Any
    external_links: Any
    pathways: Any
    reactions: Any
    snp_effects: Any
    snp_adverse_effects: Any
    targets: Any
    enzymes: Any
    carriers: Any
    transporters: Any


class DbTraditionalDrugs(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="traditional_pk"
    )
    product_name: str
    active_ingredient: str | None
    disease_indication: str | None
    scientific_literature_reference: str | None
    adverse_effects: str | None
