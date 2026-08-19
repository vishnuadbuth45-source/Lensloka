import { pool } from "@/lib/db"

export type CreatorService = {
  id: number
  name: string
  slug: string
  description: string | null
  minPrice: number | null
  maxPrice: number | null
}

export type CreatorLocation = {
  id: number
  name: string
  city: string
  state: string
  country: string
  isPrimary: boolean
}

export type Creator = {
  id: string
  name: string
  image: string | null
  bio: string | null
  experienceYears: number | null
  isVerified: boolean

  services: CreatorService[]

  locations: CreatorLocation[]

  rating: number
  reviewCount: number
}

export type Service = {
  id: number
  name: string
  slug: string
  description: string | null
}

export type Location = {
  id: string
  city: string
  state: string | null
  country: string
  slug: string
  creatorCount: number
  status: "VERIFIED" | "COMING SOON"
  mapX: number
  mapY: number
}


export type CreatorProfile = {
  id: string;
  name: string;
  image: string | null;
  bio: string | null;
  experienceYears: number | null;
  isVerified: boolean;

  services: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    creatorDescription: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  }[];

  locations: {
    id: number;
    name: string;
    city: string;
    state: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
    isPrimary: boolean;
  }[];
};

export async function getCreatorsByMatch(
  serviceSlug: string,
  locationSlug: string,
  budgetMin: number,
  budgetMax: number | null
): Promise<Creator[]> {
  const result = await pool.query(
    `
    SELECT
      cp.id,
      cp.display_name AS name,
      cp.profile_image_url AS image,
      cp.bio,
      cp.experience_years AS "experienceYears",
      cp.is_verified AS "isVerified",

      /* ------------------------------------------
         SERVICES
         ------------------------------------------ */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', s.description,
              'creatorDescription', cs.description,
              'minPrice', cs.min_price,
              'maxPrice', cs.max_price
            )
            ORDER BY s.name
          )
          FROM creator_services cs
          INNER JOIN services s
            ON s.id = cs.service_id
          WHERE cs.creator_id = cp.id
            AND cs.is_active = TRUE
            AND s.is_active = TRUE
        ),
        '[]'::json
      ) AS services,

      /* ------------------------------------------
         LOCATIONS
         ------------------------------------------ */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', l.id,
              'name', l.name,
              'city', l.city,
              'state', l.state,
              'country', l.country,
              'isPrimary', cl.is_primary
            )
            ORDER BY cl.is_primary DESC, l.city
          )
          FROM creator_locations cl
          INNER JOIN locations l
            ON l.id = cl.location_id
          WHERE cl.creator_id = cp.id
            AND l.is_active = TRUE
        ),
        '[]'::json
      ) AS locations,

      /* ------------------------------------------
         RATING
         ------------------------------------------ */

      COALESCE(
        (
          SELECT ROUND(AVG(r.rating), 1)
          FROM reviews r
          WHERE r.creator_id = cp.id
            AND r.is_published = TRUE
        ),
        0
      ) AS rating,

      /* ------------------------------------------
         REVIEW COUNT
         ------------------------------------------ */

      (
        SELECT COUNT(*)
        FROM reviews r
        WHERE r.creator_id = cp.id
          AND r.is_published = TRUE
      )::INTEGER AS "reviewCount"

    FROM creator_profiles cp

    INNER JOIN creator_services selected_service
      ON selected_service.creator_id = cp.id
      AND selected_service.is_active = TRUE

    INNER JOIN services selected_service_type
      ON selected_service_type.id = selected_service.service_id
      AND selected_service_type.slug = $1
      AND selected_service_type.is_active = TRUE

    INNER JOIN creator_locations selected_location
      ON selected_location.creator_id = cp.id

    INNER JOIN locations selected_location_type
      ON selected_location_type.id = selected_location.location_id
      AND selected_location_type.slug = $2
      AND selected_location_type.is_active = TRUE

    WHERE cp.is_published = TRUE

      /* ------------------------------------------
         BUDGET FILTER
         ------------------------------------------ */

      AND selected_service.min_price <= $3

      AND (
        $4::NUMERIC IS NULL
        OR selected_service.max_price >= $4
      )

    ORDER BY cp.created_at DESC
    `,
    [
      serviceSlug,
      locationSlug,
      budgetMax ?? budgetMin,
      budgetMin,
    ]
  )

  return result.rows
}

/* ============================================================
   GET ALL CREATORS
   ============================================================ */

export async function getCreators(): Promise<Creator[]> {
  const result = await pool.query(`
    SELECT
      cp.id,
      cp.display_name AS name,
      cp.profile_image_url AS image,
      cp.bio,
      cp.experience_years AS "experienceYears",
      cp.is_verified AS "isVerified",

      /* ------------------------------------------
         SERVICES
         ------------------------------------------ */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', cs.description,
              'minPrice', cs.min_price,
              'maxPrice', cs.max_price
            )
            ORDER BY s.name
          )
          FROM creator_services cs
          INNER JOIN services s
            ON s.id = cs.service_id
          WHERE cs.creator_id = cp.id
            AND cs.is_active = TRUE
            AND s.is_active = TRUE
        ),
        '[]'::json
      ) AS services,

      /* ------------------------------------------
         LOCATIONS
         ------------------------------------------ */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', l.id,
              'name', l.name,
              'city', l.city,
              'state', l.state,
              'country', l.country,
              'isPrimary', cl.is_primary
            )
            ORDER BY cl.is_primary DESC, l.city
          )
          FROM creator_locations cl
          INNER JOIN locations l
            ON l.id = cl.location_id
          WHERE cl.creator_id = cp.id
            AND l.is_active = TRUE
        ),
        '[]'::json
      ) AS locations,

      /* ------------------------------------------
         RATING
         ------------------------------------------ */

      COALESCE(
        (
          SELECT ROUND(AVG(r.rating), 1)
          FROM reviews r
          WHERE r.creator_id = cp.id
            AND r.is_published = TRUE
        ),
        0
      ) AS rating,

      /* ------------------------------------------
         REVIEW COUNT
         ------------------------------------------ */

      (
        SELECT COUNT(*)
        FROM reviews r
        WHERE r.creator_id = cp.id
          AND r.is_published = TRUE
      )::INTEGER AS "reviewCount"

    FROM creator_profiles cp

    WHERE cp.is_published = TRUE

    ORDER BY cp.created_at DESC
  `)

  return result.rows
}


/* ============================================================
   GET CREATORS BY SERVICE
   ============================================================ */

export async function getCreatorsByService(
  serviceId: number
): Promise<Creator[]> {
  const result = await pool.query(
    `
    SELECT
      cp.id,
      cp.display_name AS name,
      cp.profile_image_url AS image,
      cp.bio,
      cp.experience_years AS "experienceYears",
      cp.is_verified AS "isVerified",

      /* ------------------------------------------
         SERVICES
         ------------------------------------------ */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', cs.description,
              'minPrice', cs.min_price,
              'maxPrice', cs.max_price
            )
            ORDER BY s.name
          )
          FROM creator_services cs
          INNER JOIN services s
            ON s.id = cs.service_id
          WHERE cs.creator_id = cp.id
            AND cs.is_active = TRUE
            AND s.is_active = TRUE
        ),
        '[]'::json
      ) AS services,

      /* ------------------------------------------
         LOCATIONS
         ------------------------------------------ */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', l.id,
              'name', l.name,
              'city', l.city,
              'state', l.state,
              'country', l.country,
              'isPrimary', cl.is_primary
            )
            ORDER BY cl.is_primary DESC, l.city
          )
          FROM creator_locations cl
          INNER JOIN locations l
            ON l.id = cl.location_id
          WHERE cl.creator_id = cp.id
            AND l.is_active = TRUE
        ),
        '[]'::json
      ) AS locations,

      /* ------------------------------------------
         RATING
         ------------------------------------------ */

      COALESCE(
        (
          SELECT ROUND(AVG(r.rating), 1)
          FROM reviews r
          WHERE r.creator_id = cp.id
            AND r.is_published = TRUE
        ),
        0
      ) AS rating,

      /* ------------------------------------------
         REVIEW COUNT
         ------------------------------------------ */

      (
        SELECT COUNT(*)
        FROM reviews r
        WHERE r.creator_id = cp.id
          AND r.is_published = TRUE
      )::INTEGER AS "reviewCount"

    FROM creator_profiles cp

    /* ------------------------------------------
       ONLY CREATORS PROVIDING THIS SERVICE
       ------------------------------------------ */

    INNER JOIN creator_services cs_filter
      ON cs_filter.creator_id = cp.id
      AND cs_filter.service_id = $1
      AND cs_filter.is_active = TRUE

    INNER JOIN services s_filter
      ON s_filter.id = cs_filter.service_id
      AND s_filter.is_active = TRUE

    WHERE cp.is_published = TRUE

    ORDER BY cp.created_at DESC
    `,
    [serviceId]
  )

  return result.rows
}


/* ============================================================
   GET CREATORS BY LOCATION
   ============================================================ */

export async function getCreatorsByLocation(
  locationId: number
): Promise<Creator[]> {
  const result = await pool.query(
    `
    SELECT
      cp.id,
      cp.display_name AS name,
      cp.profile_image_url AS image,
      cp.bio,
      cp.experience_years AS "experienceYears",
      cp.is_verified AS "isVerified",

      /* SERVICES */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', cs.description,
              'minPrice', cs.min_price,
              'maxPrice', cs.max_price
            )
            ORDER BY s.name
          )
          FROM creator_services cs
          INNER JOIN services s
            ON s.id = cs.service_id
          WHERE cs.creator_id = cp.id
            AND cs.is_active = TRUE
            AND s.is_active = TRUE
        ),
        '[]'::json
      ) AS services,

      /* LOCATIONS */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', l.id,
              'name', l.name,
              'city', l.city,
              'state', l.state,
              'country', l.country,
              'isPrimary', cl.is_primary
            )
            ORDER BY cl.is_primary DESC, l.city
          )
          FROM creator_locations cl
          INNER JOIN locations l
            ON l.id = cl.location_id
          WHERE cl.creator_id = cp.id
            AND l.is_active = TRUE
        ),
        '[]'::json
      ) AS locations,

      /* RATING */

      COALESCE(
        (
          SELECT ROUND(AVG(r.rating), 1)
          FROM reviews r
          WHERE r.creator_id = cp.id
            AND r.is_published = TRUE
        ),
        0
      ) AS rating,

      /* REVIEW COUNT */

      (
        SELECT COUNT(*)
        FROM reviews r
        WHERE r.creator_id = cp.id
          AND r.is_published = TRUE
      )::INTEGER AS "reviewCount"

    FROM creator_profiles cp

    /* ------------------------------------------
       ONLY CREATORS SERVING THIS LOCATION
       ------------------------------------------ */

    INNER JOIN creator_locations cl_filter
      ON cl_filter.creator_id = cp.id
      AND cl_filter.location_id = $1

    INNER JOIN locations l_filter
      ON l_filter.id = cl_filter.location_id
      AND l_filter.is_active = TRUE

    WHERE cp.is_published = TRUE

    ORDER BY cp.created_at DESC
    `,
    [locationId]
  )

  return result.rows
}


/* ============================================================
   GET CREATORS BY SERVICE + LOCATION
   ============================================================ */

export async function getCreatorsByServiceAndLocation(
  serviceId: number,
  locationId: number
): Promise<Creator[]> {
  const result = await pool.query(
    `
    SELECT
      cp.id,
      cp.display_name AS name,
      cp.profile_image_url AS image,
      cp.bio,
      cp.experience_years AS "experienceYears",
      cp.is_verified AS "isVerified",

      /* SERVICES */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', cs.description,
              'minPrice', cs.min_price,
              'maxPrice', cs.max_price
            )
            ORDER BY s.name
          )
          FROM creator_services cs
          INNER JOIN services s
            ON s.id = cs.service_id
          WHERE cs.creator_id = cp.id
            AND cs.is_active = TRUE
            AND s.is_active = TRUE
        ),
        '[]'::json
      ) AS services,

      /* LOCATIONS */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', l.id,
              'name', l.name,
              'city', l.city,
              'state', l.state,
              'country', l.country,
              'isPrimary', cl.is_primary
            )
            ORDER BY cl.is_primary DESC, l.city
          )
          FROM creator_locations cl
          INNER JOIN locations l
            ON l.id = cl.location_id
          WHERE cl.creator_id = cp.id
            AND l.is_active = TRUE
        ),
        '[]'::json
      ) AS locations,

      /* RATING */

      COALESCE(
        (
          SELECT ROUND(AVG(r.rating), 1)
          FROM reviews r
          WHERE r.creator_id = cp.id
            AND r.is_published = TRUE
        ),
        0
      ) AS rating,

      /* REVIEW COUNT */

      (
        SELECT COUNT(*)
        FROM reviews r
        WHERE r.creator_id = cp.id
          AND r.is_published = TRUE
      )::INTEGER AS "reviewCount"

    FROM creator_profiles cp

    /* SERVICE FILTER */

    INNER JOIN creator_services cs_filter
      ON cs_filter.creator_id = cp.id
      AND cs_filter.service_id = $1
      AND cs_filter.is_active = TRUE

    INNER JOIN services s_filter
      ON s_filter.id = cs_filter.service_id
      AND s_filter.is_active = TRUE

    /* LOCATION FILTER */

    INNER JOIN creator_locations cl_filter
      ON cl_filter.creator_id = cp.id
      AND cl_filter.location_id = $2

    INNER JOIN locations l_filter
      ON l_filter.id = cl_filter.location_id
      AND l_filter.is_active = TRUE

    WHERE cp.is_published = TRUE

    ORDER BY cp.created_at DESC
    `,
    [serviceId, locationId]
  )

  return result.rows
}


/* ============================================================
   GET ALL SERVICES
   ============================================================ */

export async function getServices(): Promise<Service[]> {
  const result = await pool.query(`
    SELECT
      id,
      name,
      slug,
      description

    FROM services

    WHERE is_active = TRUE

    ORDER BY name ASC
  `)

  return result.rows
}


export async function getLocations(): Promise<Location[]> {
  const result = await pool.query(`
    SELECT
      l.id,
      l.city,
      l.state,
      l.country,
      l.slug,

      l.map_x AS "mapX",
      l.map_y AS "mapY",

      COUNT(DISTINCT cp.id)::INTEGER AS "creatorCount",

      CASE
        WHEN COUNT(DISTINCT cp.id) > 0
          THEN 'VERIFIED'
        ELSE 'COMING SOON'
      END AS status

    FROM locations l

    LEFT JOIN creator_locations cl
      ON cl.location_id = l.id

    LEFT JOIN creator_profiles cp
      ON cp.id = cl.creator_id
      AND cp.is_published = TRUE

    WHERE l.is_active = TRUE

    GROUP BY
      l.id,
      l.city,
      l.state,
      l.country,
      l.slug,
      l.map_x,
      l.map_y

    ORDER BY
      COUNT(DISTINCT cp.id) DESC,
      l.city ASC
  `)

  return result.rows
}


export async function getCreatorsByServiceSlug(
  slug: string
): Promise<Creator[]> {
  const result = await pool.query(
    `
    SELECT
      cp.id,
      cp.display_name AS name,
      cp.profile_image_url AS image,
      cp.bio,
      cp.experience_years AS "experienceYears",
      cp.is_verified AS "isVerified",

      /* SERVICES */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', cs.description,
              'minPrice', cs.min_price,
              'maxPrice', cs.max_price
            )
            ORDER BY s.name
          )
          FROM creator_services cs

          INNER JOIN services s
            ON s.id = cs.service_id

          WHERE cs.creator_id = cp.id
            AND cs.is_active = TRUE
            AND s.is_active = TRUE
        ),
        '[]'::json
      ) AS services,

      /* LOCATIONS */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', l.id,
              'city', l.city,
              'state', l.state,
              'country', l.country,
              'slug', l.slug,
              'isPrimary', cl.is_primary
            )
            ORDER BY cl.is_primary DESC, l.city
          )
          FROM creator_locations cl

          INNER JOIN locations l
            ON l.id = cl.location_id

          WHERE cl.creator_id = cp.id
            AND l.is_active = TRUE
        ),
        '[]'::json
      ) AS locations,

      /* RATING */

      COALESCE(
        (
          SELECT ROUND(AVG(r.rating), 1)
          FROM reviews r
          WHERE r.creator_id = cp.id
            AND r.is_published = TRUE
        ),
        0
      ) AS rating,

      /* REVIEW COUNT */

      (
        SELECT COUNT(*)
        FROM reviews r
        WHERE r.creator_id = cp.id
          AND r.is_published = TRUE
      )::INTEGER AS "reviewCount"

    FROM creator_profiles cp

    INNER JOIN creator_services cs_filter
      ON cs_filter.creator_id = cp.id
      AND cs_filter.is_active = TRUE

    INNER JOIN services s_filter
      ON s_filter.id = cs_filter.service_id
      AND s_filter.is_active = TRUE
      AND s_filter.slug = $1

    WHERE cp.is_published = TRUE

    ORDER BY cp.created_at DESC
    `,
    [slug]
  )

  return result.rows
}

export async function getLocationBySlug(
  slug: string
): Promise<Location | null> {
  const result = await pool.query(
    `
    SELECT
      l.id,
      l.city,
      l.state,
      l.country,
      l.slug,
      l.map_x AS "mapX",
      l.map_y AS "mapY",

      COUNT(DISTINCT cp.id)::INTEGER AS "creatorCount",

      CASE
        WHEN COUNT(DISTINCT cp.id) > 0
          THEN 'VERIFIED'
        ELSE 'COMING SOON'
      END AS status

    FROM locations l

    LEFT JOIN creator_locations cl
      ON cl.location_id = l.id

    LEFT JOIN creator_profiles cp
      ON cp.id = cl.creator_id
      AND cp.is_published = TRUE

    WHERE l.slug = $1
      AND l.is_active = TRUE

    GROUP BY
      l.id,
      l.city,
      l.state,
      l.country,
      l.slug,
      l.map_x,
      l.map_y
    `,
    [slug]
  )

  return result.rows[0] ?? null
}


export async function getCreatorsByLocationSlug(
  slug: string
): Promise<Creator[]> {
  const result = await pool.query(
    `
    SELECT
      cp.id,
      cp.display_name AS name,
      cp.profile_image_url AS image,
      cp.bio,
      cp.experience_years AS "experienceYears",
      cp.is_verified AS "isVerified",

      /* SERVICES */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', cs.description,
              'minPrice', cs.min_price,
              'maxPrice', cs.max_price
            )
            ORDER BY s.name
          )
          FROM creator_services cs

          INNER JOIN services s
            ON s.id = cs.service_id

          WHERE cs.creator_id = cp.id
            AND cs.is_active = TRUE
            AND s.is_active = TRUE
        ),
        '[]'::json
      ) AS services,

      /* LOCATIONS */

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', l2.id,
              'city', l2.city,
              'state', l2.state,
              'country', l2.country,
              'slug', l2.slug,
              'isPrimary', cl2.is_primary
            )
            ORDER BY cl2.is_primary DESC, l2.city
          )
          FROM creator_locations cl2

          INNER JOIN locations l2
            ON l2.id = cl2.location_id

          WHERE cl2.creator_id = cp.id
            AND l2.is_active = TRUE
        ),
        '[]'::json
      ) AS locations,

      /* RATING */

      COALESCE(
        (
          SELECT ROUND(AVG(r.rating), 1)
          FROM reviews r
          WHERE r.creator_id = cp.id
            AND r.is_published = TRUE
        ),
        0
      ) AS rating,

      /* REVIEW COUNT */

      (
        SELECT COUNT(*)
        FROM reviews r
        WHERE r.creator_id = cp.id
          AND r.is_published = TRUE
      )::INTEGER AS "reviewCount"

    FROM creator_profiles cp

    INNER JOIN creator_locations cl_filter
      ON cl_filter.creator_id = cp.id

    INNER JOIN locations l_filter
      ON l_filter.id = cl_filter.location_id
      AND l_filter.is_active = TRUE
      AND l_filter.slug = $1

    WHERE cp.is_published = TRUE

    ORDER BY cp.created_at DESC
    `,
    [slug]
  )

  return result.rows
}



export async function getCreatorProfile(
  creatorId: string
): Promise<CreatorProfile | null> {
  const result = await pool.query(
    `
    SELECT
      cp.id,
      cp.display_name AS name,
      cp.profile_image_url AS image,
      cp.bio,
      cp.experience_years AS "experienceYears",
      cp.is_verified AS "isVerified",

      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', s.description,
              'creatorDescription', cs.description,
              'minPrice', cs.min_price,
              'maxPrice', cs.max_price
            )
            ORDER BY s.name
          )
          FROM creator_services cs
          INNER JOIN services s
            ON s.id = cs.service_id
          WHERE
            cs.creator_id = cp.id
            AND cs.is_active = TRUE
            AND s.is_active = TRUE
        ),
        '[]'::json
      ) AS services,

      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', l.id,
              'name', l.name,
              'city', l.city,
              'state', l.state,
              'country', l.country,
              'latitude', l.latitude,
              'longitude', l.longitude,
              'isPrimary', cl.is_primary
            )
            ORDER BY
              cl.is_primary DESC,
              l.city
          )
          FROM creator_locations cl
          INNER JOIN locations l
            ON l.id = cl.location_id
          WHERE
            cl.creator_id = cp.id
            AND l.is_active = TRUE
        ),
        '[]'::json
      ) AS locations

    FROM creator_profiles cp

    WHERE
      cp.id = $1
      AND cp.is_published = TRUE

    LIMIT 1;
    `,
    [creatorId]
  );

  return result.rows[0] ?? null;
}