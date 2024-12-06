from pydantic import BaseModel, Field
from typing import Any


class TraditionalDrugsDisplay(BaseModel):
    product_name: Any
    active_ingredient: Any
    disease_indications: Any
    scientific_literature_reference: Any
    adverse_effects: Any


class OrthodoxDrugs(BaseModel):
    # drugbank_id: Any = Field(alias="drugbank-id")
    name: Any
    description: Any
    cas_number: Any = Field(alias="cas-number")
    unii: Any
    state: Any
    groups: Any
    # general_references: Any = Field(alias="general-references")
    # synthesis_reference: Any = Field(alias="synthesis-reference")
    indication: Any
    pharmacodynamics: Any
    mechanism_of_action: Any = Field(alias="mechanism-of-action")
    toxicity: Any
    metabolism: Any
    absorption: Any
    half_life: Any = Field(alias="half-life")
    # protein_binding: Any = Field(alias="protein-binding")
    # route_of_elimination: Any = Field(alias="route-of-elimination")
    # volume_of_distribution: Any = Field(alias="volume-of-distribution")
    # clearance: Any
    classification: Any | None = None
    # salts: Any
    synonyms: Any
    products: Any
    international_brands: Any = Field(alias="international-brands")
    # mixtures: Any
    # packagers: Any
    manufacturers: Any
    prices: Any
    categories: Any
    affected_organisms: Any = Field(alias="affected-organisms")
    dosages: Any
    # atc_codes: Any = Field(alias="atc-codes")
    # ahfs_codes: Any = Field(alias="ahfs-codes")
    # pdb_entries: Any = Field(alias="pdb-entries")
    # patents: Any
    food_interactions: Any = Field(alias="food-interactions")
    drug_interactions: Any = Field(alias="drug-interactions")
    # sequences: Any | None = None
    # experimental_properties: Any = Field(alias="experimental-properties")
    # external_identifiers: Any = Field(alias="external-identifiers")
    # external_links: Any = Field(alias="external-links")
    pathways: Any
    reactions: Any
    # snp_effects: Any = Field(alias="snp-effects")
    # snp_adverse_drug_reactions: Any = Field(alias="snp-adverse-drug-reactions")
    # targets: Any
    # enzymes: Any
    # carriers: Any
    # transporters: Any


class OrthodoxDrugsDisplay(BaseModel):
    data: list[OrthodoxDrugs]
    has_more: bool
    next_last_id: str | None
