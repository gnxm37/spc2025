import cupy
import torch
from diffusers import FluxPipeline
from dfloat11 import DFloat11Model

# GPU 사용 가능 여부 확인
if not torch.cuda.is_available():
    raise RuntimeError("CUDA가 활성화되지 않았습니다. GPU를 사용할 수 없습니다.")

# GPU 장치 설정
device = torch.device("cuda")

# 모델 로드
pipe = FluxPipeline.from_pretrained(
    "black-forest-labs/FLUX.1-dev", 
    torch_dtype=torch.float16,  # GPU에서 float16 사용
    device_map="auto"          # GPU에 자동으로 매핑
)
pipe.enable_model_cpu_offload()

# DFloat11 모델 로드
DFloat11Model.from_pretrained(
    'DFloat11/FLUX.1-dev-DF11', 
    device=device, 
    bfloat16_model=pipe.transformer
)

# 프롬프트 설정
prompt = "A futuristic cityscape at sunset, with flying cars, neon lights, and reflective water canals"

# 이미지 생성
image = pipe(
    prompt,
    width=1920,
    height=1440,
    guidance_scale=3.5,
    num_inference_steps=50,
    max_sequence_length=512,
    generator=torch.Generator(device=device).manual_seed(0)  # GPU에서 시드 설정
).images[0]

# 이미지 저장
image.save("image.png")
print("이미지가 'image.png'로 저장되었습니다.")
