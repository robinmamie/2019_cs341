#version 140
#extension GL_ARB_explicit_attrib_location : enable

uniform sampler2D depth_map;
uniform sampler2D color_map;

uniform vec3 light_position;

in vec3  v2f_ec_vertex;
in float v2f_height;

out vec4 f_color;

const float terrain_water_level    = -0.03125 + 1e-6;


vec4 reflection() {
    
    vec3 ray = normalize(v2f_ec_vertex);
    
    // Reflections are only on the water, so the normal is simply up.
    // TODO add jitter
    vec3 normal = vec3(0.0f, 1.0f, 0.0);
    vec3 reflected = reflect(normal, ray);
    
    // Use algorithm to go pixel by pixel UNTIL behind or outside screen
    
    // If behind -> give color of this point
    
    // If outside -> light blue color for the sky
    
    
    
}


void main()
{
    float height = v2f_height;
    
    f_color = height > terrain_water_level ?
                texture(color_map, v2f_ec_vertex) :
                reflection();
    
    
}

/*
uniform mat4 invView;
uniform mat4 projection;
uniform mat4 invprojection;
uniform mat4 view;

noperspective in vec2 tex_coord;

out vec4 outColor;

const float step = 0.1;
const float minRayStep = 0.1;
const float maxSteps = 30;
const int numBinarySearchSteps = 5;
const float reflectionSpecularFalloffExponent = 3.0;

float Metallic;

#define Scale vec3(.8, .8, .8)
#define K 19.19

vec3 PositionFromDepth(float depth);

vec3 BinarySearch(inout vec3 dir, inout vec3 hitCoord, inout float dDepth);

vec4 RayCast(vec3 dir, inout vec3 hitCoord, out float dDepth);

vec3 fresnelSchlick(float cosTheta, vec3 F0);

vec3 hash(vec3 a);

void main()
{

    vec2 MetallicEmmissive = texture2D(gExtraComponents, tex_coord).rg;
    Metallic = MetallicEmmissive.r;

    if(Metallic < 0.01)
        discard;

    vec3 viewNormal = vec3(texture2D(gNormal, tex_coord) * invView);
    vec3 viewPos = textureLod(gPosition, tex_coord, 2).xyz;
    vec3 albedo = texture(gFinalImage, tex_coord).rgb;

    float spec = texture(ColorBuffer, tex_coord).w;

    vec3 F0 = vec3(0.04);
    F0      = mix(F0, albedo, Metallic);
    vec3 Fresnel = fresnelSchlick(max(dot(normalize(viewNormal), normalize(viewPos)), 0.0), F0);

    // Reflection vector
    vec3 reflected = normalize(reflect(normalize(viewPos), normalize(viewNormal)));


    vec3 hitPos = viewPos;
    float dDepth;

    vec3 wp = vec3(vec4(viewPos, 1.0) * invView);
    vec3 jitt = mix(vec3(0.0), vec3(hash(wp)), spec);
    vec4 coords = RayMarch((vec3(jitt) + reflected * max(minRayStep, -viewPos.z)), hitPos, dDepth);


    vec2 dCoords = smoothstep(0.2, 0.6, abs(vec2(0.5, 0.5) - coords.xy));


    float screenEdgefactor = clamp(1.0 - (dCoords.x + dCoords.y), 0.0, 1.0);

    float ReflectionMultiplier = pow(Metallic, reflectionSpecularFalloffExponent) *
                screenEdgefactor *
                -reflected.z;

    // Get color
    vec3 SSR = textureLod(gFinalImage, coords.xy, 0).rgb * clamp(ReflectionMultiplier, 0.0, 0.9) * Fresnel;

    outColor = vec4(SSR, Metallic);
}

vec3 PositionFromDepth(float depth) {
    float z = depth * 2.0 - 1.0;

    vec4 clipSpacePosition = vec4(tex_coord * 2.0 - 1.0, z, 1.0);
    vec4 viewSpacePosition = invprojection * clipSpacePosition;

    // Perspective division
    viewSpacePosition /= viewSpacePosition.w;

    return viewSpacePosition.xyz;
}

vec3 BinarySearch(inout vec3 dir, inout vec3 hitCoord, inout float dDepth)
{
    float depth;

    vec4 projectedCoord;

    for(int i = 0; i < numBinarySearchSteps; i++)
    {

        projectedCoord = projection * vec4(hitCoord, 1.0);
        projectedCoord.xy /= projectedCoord.w;
        projectedCoord.xy = projectedCoord.xy * 0.5 + 0.5;

        depth = textureLod(gPosition, projectedCoord.xy, 2).z;


        dDepth = hitCoord.z - depth;

        dir *= 0.5;
        if(dDepth > 0.0)
            hitCoord += dir;
        else
            hitCoord -= dir;
    }

        projectedCoord = projection * vec4(hitCoord, 1.0);
        projectedCoord.xy /= projectedCoord.w;
        projectedCoord.xy = projectedCoord.xy * 0.5 + 0.5;

    return vec3(projectedCoord.xy, depth);
}

vec4 RayMarch(vec3 dir, inout vec3 hitCoord, out float dDepth)
{

    dir *= step;


    float depth;
    int steps;
    vec4 projectedCoord;


    for(int i = 0; i < maxSteps; i++)
    {
        hitCoord += dir;

        projectedCoord = projection * vec4(hitCoord, 1.0);
        projectedCoord.xy /= projectedCoord.w;
        projectedCoord.xy = projectedCoord.xy * 0.5 + 0.5;

        depth = textureLod(gPosition, projectedCoord.xy, 2).z;
        if(depth > 1000.0)
            continue;

        dDepth = hitCoord.z - depth;

        if((dir.z - dDepth) < 1.2)
        {
            if(dDepth <= 0.0)
            {
                vec4 Result;
                Result = vec4(BinarySearch(dir, hitCoord, dDepth), 1.0);

                return Result;
            }
        }

        steps++;
    }


    return vec4(projectedCoord.xy, depth, 0.0);
}

vec3 fresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}


vec3 hash(vec3 a)
{
    a = fract(a * Scale);
    a += dot(a, a.yxz + K);
    return fract((a.xxy + a.yxx)*a.zyx);
}
*/
